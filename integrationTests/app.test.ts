import nock from 'nock';
import request from 'supertest';
import { api } from '#configs';
import app from '../src/app';
import { makeHeroApiResponse, makeHeroProfileApiResponse } from '../tests/_doubles';

const hero = makeHeroApiResponse({ id: '12' });
const heroProfile = makeHeroProfileApiResponse();

const heroesScope = nock(`${api.hahowRecruitApiUrl}`)

describe('GET /heroes', () => {
  test('without auth', async () => {
    heroesScope
      .get('/heroes')
      .reply(200, [hero]);

    const res = await request(app).get('/heroes');

    expect(res.body).toEqual([hero]);
    expect(res.status).toBe(200);
  });

  test('auth succeed', async () => {
    heroesScope
      .get('/heroes')
      .reply(200, [hero]);
    heroesScope
      .post('/auth')
      .reply(200);
    heroesScope
      .get(`/heroes/${hero.id}/profile`)
      .reply(200, heroProfile);

    const res = await request(app).get('/heroes')
      .set('Name', 'hahow')
      .set('Password', '1234a');

    expect(res.body).toEqual([{ ...hero, profile: heroProfile }]);
    expect(res.status).toBe(200);
  });

  test('auth failed', async () => {
    heroesScope
      .get('/heroes')
      .reply(200, [hero]);
    heroesScope
      .post('/auth')
      .reply(401);
    heroesScope
      .get(`/heroes/${hero.id}/profile`)
      .reply(200, heroProfile);

    const res = await request(app).get('/heroes')
      .set('Name', 'hahow')
      .set('Password', '1234a');

    expect(res.body).toEqual([hero]);
    expect(res.status).toBe(200);
  });

  test('api server down', async () => {
    heroesScope
      .get('/heroes')
      .reply(500);
    heroesScope
      .post('/auth')
      .reply(500);
    heroesScope
      .get(`/heroes/${hero.id}/profile`)
      .reply(500);

    const res = await request(app).get('/heroes')
      .set('Name', 'hahow')
      .set('Password', '1234a');

    expect(res.body).toEqual([]);
    expect(res.status).toBe(200);
  });
});

describe('GET /heroes/:heroID', () => {
  test('without auth', async () => {
    heroesScope
      .get(`/heroes/${hero.id}`)
      .reply(200, hero);

    const res = await request(app).get(`/heroes/${hero.id}`);

    expect(res.body).toEqual(hero);
    expect(res.status).toBe(200);
  });

  test('auth succeed', async () => {
    heroesScope
      .get(`/heroes/${hero.id}`)
      .reply(200, hero);
    heroesScope
      .post('/auth')
      .reply(200);
    heroesScope
      .get(`/heroes/${hero.id}/profile`)
      .reply(200, heroProfile);

    const res = await request(app).get(`/heroes/${hero.id}`)
      .set('Name', 'hahow')
      .set('Password', '1234a');

    expect(res.body).toEqual({ ...hero, profile: heroProfile });
    expect(res.status).toBe(200);
  });

  test('auth failed', async () => {
    heroesScope
      .get(`/heroes/${hero.id}`)
      .reply(200, hero);
    heroesScope
      .post('/auth')
      .reply(401);
    heroesScope
      .get(`/heroes/${hero.id}/profile`)
      .reply(200, heroProfile);

    const res = await request(app).get(`/heroes/${hero.id}`)
      .set('Name', 'hahow')
      .set('Password', '1234a');

    expect(res.body).toEqual(hero);
    expect(res.status).toBe(200);
  });

  test('hero not found', async () => {
    heroesScope
      .get(`/heroes/${hero.id}`)
      .reply(404);
    heroesScope
      .post('/auth')
      .reply(200);
    heroesScope
      .get(`/heroes/${hero.id}/profile`)
      .reply(404);

    const res = await request(app).get(`/heroes/${hero.id}`)
      .set('Name', 'hahow')
      .set('Password', '1234a');

    expect(res.status).toBe(404);
  });

  test('api server down', async () => {
    heroesScope
      .get(`/heroes/${hero.id}`)
      .reply(500);
    heroesScope
      .post('/auth')
      .reply(500);
    heroesScope
      .get(`/heroes/${hero.id}/profile`)
      .reply(500);

    const res = await request(app).get(`/heroes/${hero.id}`)
      .set('Name', 'hahow')
      .set('Password', '1234a');

    expect(res.status).toBe(404);
  });
});
