import test from 'node:test';
import assert from 'node:assert/strict';
import { refreshGoogleAccessToken } from '../lib/auth/token-refresh.ts';

const token = { accessToken: 'old', refreshToken: 'refresh', accessTokenExpires: 1 };
const response = (body, status = 200) => new Response(JSON.stringify(body), { status });

test('refresh restores access and preserves refresh token', async () => {
  const result = await refreshGoogleAccessToken({ ...token, error: 'AccessTokenRefreshUnavailable' }, async () => response({ access_token: 'new', expires_in: 3600 }), 1000);
  assert.equal(result.accessToken, 'new');
  assert.equal(result.refreshToken, 'refresh');
  assert.equal(result.accessTokenExpires, 3601000);
  assert.equal(result.error, undefined);
});

test('revoked grant and missing refresh token require login', async () => {
  const result = await refreshGoogleAccessToken(token, async () => response({ error: 'invalid_grant' }, 400));
  assert.equal(result.error, 'ReauthenticationRequired');
  assert.equal((await refreshGoogleAccessToken({ accessToken: 'old' })).error, 'ReauthenticationRequired');
});

test('outages and malformed responses remain retryable', async () => {
  for (const fetcher of [
    async () => response({ error: 'server_error' }, 503),
    async () => response({ error: 'rate_limited' }, 429),
    async () => response({ access_token: 'new' }),
    async () => new Response('bad-json'),
    async () => { throw new Error('offline'); },
  ]) {
    const result = await refreshGoogleAccessToken(token, fetcher, 1000);
    assert.equal(result.error, 'AccessTokenRefreshUnavailable');
    assert.equal(result.refreshRetryAt, 31000);
    assert.equal(result.accessToken, 'old');
  }
});

test('simultaneous checks share one provider request', async () => {
  let calls = 0;
  let resolve;
  const waiting = new Promise(r => { resolve = r; });
  const fetcher = async () => { calls++; await waiting; return response({ access_token: 'new', expires_in: 3600 }); };
  const first = refreshGoogleAccessToken(token, fetcher);
  const second = refreshGoogleAccessToken(token, fetcher);
  resolve();
  assert.deepEqual(await first, await second);
  assert.equal(calls, 1);
});
