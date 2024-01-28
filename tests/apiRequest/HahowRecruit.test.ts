import { HahowRecruitApi } from '#apiRequests';
import { makeHeroApiResponse, makeHeroProfileApiResponse } from '../_doubles';
import { mockGet, mockPost } from '../_mocks/axios';

const api = new HahowRecruitApi();

beforeEach(() => {
  jest.resetAllMocks();
});

describe('getHero()', () => {
  it('should return HeroApiResponse if http request succeeds', async () => {
    const status  = 200;
    const heroRes = makeHeroApiResponse({ id: '1' });
    mockGet.mockResolvedValueOnce({ status, data: heroRes });

    const res = await api.getHero(1);
    expect(res).toEqual(heroRes);
  });

  it('should return null if status is not 200', async () => {
    const status = 404;
    mockGet.mockResolvedValueOnce({ status });

    const res = await api.getHero(1);
    expect(res).toEqual(null);
  });

  it('should return null if api response schema is not valid', async () => {
    const status = 200;
    const data   = { message: 'I love DC' };
    mockGet.mockResolvedValueOnce({ status, data });

    const res = await api.getHero(1);
    expect(res).toEqual(null);
  });
});

describe('getHeroes()', () => {
  it('should return an array of hero responses', async () => {
    const status   = 200;
    const heroRes1 = makeHeroApiResponse({ id: '1' });
    const heroRes2 = makeHeroApiResponse({ id: '2' });
    const heroes   = [heroRes1, heroRes2];
    mockGet.mockResolvedValueOnce({ status, data: heroes });

    const res = await api.getHeroes();
    expect(res).toEqual(heroes);
  });

  it('should return an empty array if request failed', async () => {
    const status = 500;
    mockGet.mockResolvedValueOnce({ status });

    const res = await api.getHeroes();
    expect(res).toEqual([]);
  });

  it('should return an empty array if schema is not valid', async () => {
    const status = 200;
    mockGet.mockResolvedValueOnce({ status, data: [{ message: 'I love DC.' }] });

    const res = await api.getHeroes();
    expect(res).toEqual([]);
  });
});

describe('getHeroProfile()', () => {
  it('should return profile of the hero', async () => {
    const status     = 200;
    const profileRes = makeHeroProfileApiResponse();
    mockGet.mockResolvedValueOnce({ status, data: profileRes });

    const res = await api.getHeroProfile(1);
    expect(res).toEqual(profileRes);
  });

  it('should return null if request failed', async () => {
    const status = 500;
    mockGet.mockResolvedValueOnce({ status });

    const res = await api.getHeroProfile(1);
    expect(res).toEqual(null);
  });

  it('should return null if the schema is invalid', async () => {
    const status = 200;
    mockGet.mockResolvedValueOnce({ status, data: { message: 'I love DC' } });

    const res = await api.getHeroProfile(1);
    expect(res).toEqual(null);
  });
});

describe('auth()', () => {
  const name = 'UiHceyM3wN';
  const password = '6WgWshRFux';
  it('should return true if auth succeed', async () => {
    const status = 200;
    mockPost.mockResolvedValueOnce({ status });

    const res = await api.auth(name, password);
    expect(res).toBe(true);
  });

  it('should return false if auth failed', async () => {
    const status = 401;
    mockPost.mockResolvedValueOnce({ status });

    const res = await api.auth(name, password);
    expect(res).toBe(false);
  });
});
