import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyUserSession } from '../lib/auth/session-recovery.ts';

const now = 100000;
const original = { accessToken: 'old', accessTokenExpires: now + 3600000, refreshToken: 'refresh', userInfo: { email: 'test@example.invalid', nickname: 'name' } };
const refreshed = { ...original, accessToken: 'new', refreshRetryAt: now + 30000 };

test('user-info 401 refreshes once and persists the recovered token', async () => {
  const tokens = []; let calls = 0;
  const result = await verifyUserSession(original, async token => {
    tokens.push(token);
    return token === 'old' ? { status: 'unauthorized' } : { status: 'ok', data: original.userInfo };
  }, async () => { calls++; return refreshed; }, now);
  assert.deepEqual(tokens, ['old', 'new']); assert.equal(calls, 1);
  assert.equal(result.accessToken, 'new'); assert.equal(result.error, undefined);
});

test('outage preserves usable token/identity and does not refresh Google', async () => {
  const result = await verifyUserSession(original, async () => ({ status: 'unavailable' }), async () => { throw new Error('must not refresh'); }, now);
  assert.equal(result.error, 'UserInfoUnavailable'); assert.equal(result.accessToken, 'old'); assert.deepEqual(result.userInfo, original.userInfo);
  const recovered = await verifyUserSession(result, async () => ({ status: 'ok', data: original.userInfo }), async () => { throw new Error('must not refresh'); }, now);
  assert.equal(recovered.error, undefined);
});

test('fresh token rejected again requires login, without repeated refresh', async () => {
  let calls = 0;
  const result = await verifyUserSession(original, async () => ({ status: 'unauthorized' }), async () => { calls++; return refreshed; }, now);
  assert.equal(calls, 1); assert.equal(result.error, 'ReauthenticationRequired'); assert.equal(result.accessToken, '');
  const already = await verifyUserSession(refreshed, async () => ({ status: 'unauthorized' }), async () => { throw new Error('must not refresh twice'); }, now, true);
  assert.equal(already.error, 'ReauthenticationRequired');
});

test('refresh outage discards the rejected access token and respects retry window', async () => {
  const result = await verifyUserSession(original, async () => ({ status: 'unauthorized' }), async () => ({ ...original, error: 'AccessTokenRefreshUnavailable', refreshRetryAt: now + 30000 }), now);
  assert.equal(result.accessToken, ''); assert.equal(result.error, 'AccessTokenRefreshUnavailable');
  const throttled = await verifyUserSession({ ...original, refreshRetryAt: now + 30000 }, async () => ({ status: 'unauthorized' }), async () => { throw new Error('cooldown'); }, now);
  assert.equal(throttled.accessToken, ''); assert.equal(throttled.error, 'AccessTokenRefreshUnavailable');
});
