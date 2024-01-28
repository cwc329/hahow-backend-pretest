import { createRequest } from 'node-mocks-http';
import { AuthPayload } from '#middlewares/payloads';

describe('valid payload', () => {
  it('should be valid if both name and password are strings', () => {
    const headers = {
      name: 'eJbjp5Gv',
      password: 'FqQ7TLr',
    }
    const req = createRequest({ headers });
    const payload = new AuthPayload(req);
    expect(payload.isValid()).toBe(true);
  });
});

describe('invalid payload', () => {
  it('it should be invalid if both name and password are undefined', () => {
    const req = createRequest();
    const payload = new AuthPayload(req);
    expect(payload.isValid()).toBe(false);
  });
})
