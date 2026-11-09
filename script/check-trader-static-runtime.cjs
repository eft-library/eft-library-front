// Run after `pnpm build`. Only a dedicated temporary snapshot is created/deleted.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const net = require('node:net');
const { randomUUID } = require('node:crypto');
const { spawn } = require('node:child_process');
const appRoot = path.resolve(__dirname, '..');
(async () => {
  const listener = net.createServer();
  await new Promise(resolve => listener.listen(0, '127.0.0.1', resolve));
  const port = listener.address().port;
  await new Promise(resolve => listener.close(resolve));
  const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], { cwd: appRoot, env: { ...process.env, NODE_ENV: 'production' }, stdio: ['ignore', 'pipe', 'pipe'] });
  let logs = '';for (const stream of [server.stdout, server.stderr]) stream.on('data', chunk => { logs = (logs + chunk).slice(-6000); });
  const generation = randomUUID().replaceAll('-', '');
  const relative = `/static/trader/v3/snapshots/${generation}`;
  const directory = path.join(appRoot, 'public', relative);
  let outside;
  const get = url => fetch(`http://127.0.0.1:${port}${url}`, { signal: AbortSignal.timeout(10_000) });
  try {
    let ready = false;
    for (let i = 0; i < 100; i++) {
      if (server.exitCode !== null) throw new Error(`Production server exited: ${logs}`);
      try { if ((await get('/api/health')).ok) { ready = true; break; } } catch {}
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    assert(ready, logs);
    // This generation does not exist when next start scans public.
    const missing = await get(`${relative}/pvp-season/list.json`);
    assert.equal(missing.status, 404);
    assert.match(missing.headers.get('content-type'), /application\/json/);
    assert.equal(missing.headers.get('cache-control'), 'no-store');
    assert((await missing.text()).length < 200, 'Missing JSON must not send the full Next.js 404 page');
    await fs.mkdir(path.join(directory, 'pvp-season/offers'), { recursive: true });
    const payload = { status: 200, msg: 'OK', data: { generation, offers: [] } };
    const listPath = `${relative}/pvp-season/list.json`;
    const offerPath = `${relative}/pvp-season/offers/5ac3b934156ae10c4430e83c.json`;
    await fs.writeFile(path.join(appRoot, 'public', listPath), JSON.stringify(payload));
    await fs.writeFile(path.join(appRoot, 'public', offerPath), JSON.stringify(payload));
    for (const url of [listPath, offerPath, listPath.replace('/static/', '/api/static/')]) {
      const response = await get(url);
      assert.equal(response.status, 200, url);
      assert.match(response.headers.get('content-type'), /application\/json/);
      assert.match(response.headers.get('cache-control'), /immutable/);
      assert.deepEqual(await response.json(), payload);
    }
    const index = await get('/static/trader/v3/index.json');
    assert.equal(index.headers.get('cache-control'), 'no-store');
    const localIndex = await fs.readFile(path.join(appRoot, 'public/static/trader/v3/index.json'), 'utf8').catch(error => {
      if (error.code === 'ENOENT') return null;
      throw error;
    });
    assert.equal(index.status, localIndex === null ? 404 : 200);
    if (localIndex !== null) assert.deepEqual(await index.json(), JSON.parse(localIndex));
    const invalid = await get(`${relative}/pvp-season/offers/not-an-item.json`);
    assert.equal(invalid.status, 404);
    outside = await fs.mkdtemp(path.join(os.tmpdir(), 'trader-runtime-'));
    const secretFile = path.join(outside, 'private.json');
    await fs.writeFile(secretFile, '{"private":true}');
    await fs.symlink(secretFile, path.join(directory, 'pvp-season/offers/000000000000000000000000.json'));
    const escaped = await get(`${relative}/pvp-season/offers/000000000000000000000000.json`);
    assert.equal(escaped.status, 404, 'Symlinks outside the trader directory must not be served');
    console.log('PASS production: new snapshots served after startup without restart; existing URLs preserved; index/404 no-store; snapshots immutable; small JSON errors; path/symlink isolation');
  } catch (error) { console.error(logs); throw error; }
  finally {
    const closed = new Promise(resolve => server.once('exit', resolve));
    server.kill('SIGTERM');
    if (server.exitCode === null) await closed;
    await fs.rm(directory, { recursive: true, force: true });
    if (outside) await fs.rm(outside, { recursive: true, force: true });
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
