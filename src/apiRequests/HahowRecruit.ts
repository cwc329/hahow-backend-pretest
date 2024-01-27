import Ajv, { ValidateFunction } from 'ajv';
import axios, { AxiosInstance } from 'axios';
import type { Logger } from 'winston';
import { api } from '#configs';
import { logger } from '#utils';

export interface HeroProfileApiResponse {
  str: number;
  agi: number;
  int: number;
  luk: number;
}

export interface HeroApiResponse {
  id: string;
  name: string;
  image: string;
}

export class HahowRecruitApi {
  private readonly apiInstance: AxiosInstance;

  private readonly logger: Logger;

  private readonly heroApiResponseValidator: ValidateFunction<HeroApiResponse>;

  private readonly heroProfileApiResponseValidator: ValidateFunction<HeroProfileApiResponse>;

  public constructor() {
    this.apiInstance = axios.create({
      baseURL: api.hahowRecruitApiUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    this.logger      = logger;
    const ajv        = new Ajv();

    const heroApiResponseSchema   = {
      type: 'object',
      properties: {
        id: { type: 'string' },
        image: { type: 'string' },
        name: { type: 'string' },
      },
      required: ['id', 'image', 'name'],
      additionalProperties: false,
    };
    this.heroApiResponseValidator = ajv.compile(heroApiResponseSchema);

    const heroProfileApiResponseSchema   = {
      type: 'object',
      properties: {
        str: { type: 'integer' },
        agi: { type: 'integer' },
        int: { type: 'integer' },
        luk: { type: 'integer' },
      },
      required: ['str', 'agi', 'int', 'luk'],
      additionalProperties: false,
    };
    this.heroProfileApiResponseValidator = ajv.compile(heroProfileApiResponseSchema);
  }

  public async auth(name: string, password: string): Promise<boolean> {
    try {
      const res = await this.apiInstance.post('/auth', { name, password });
      return res.status === 200;
    } catch (error: unknown) {
      this.logger.error(error);
      return false;
    }
  }

  public async getHeroes(): Promise<HeroApiResponse[]> {
    try {
      const res                       = await this.apiInstance.get('/heroes');
      const heroes: HeroApiResponse[] = [];
      const { status, data }          = res;
      if (status !== 200 || !Array.isArray(data)) {
        return heroes;
      }

      data.forEach((datum) => {
        const hero = this.toHeroResponse(datum);
        if (hero) heroes.push(hero);
      });

      return heroes;
    } catch (error: unknown) {
      this.logger.error(error);
      return [];
    }
  }

  public async getHero(id: number): Promise<HeroApiResponse | null> {
    try {
      const res              = await this.apiInstance.get(`/heroes/${id}`);
      const { status, data } = res;
      if (status !== 200) {
        return null;
      }

      return this.toHeroResponse(data);
    } catch (error: unknown) {
      this.logger.error(error);
      return null;
    }
  }

  public async getHeroProfile(id: number): Promise<HeroProfileApiResponse | null> {
    try {
      const res              = await this.apiInstance.get(`/heroes/${id}/profile`);
      const { status, data } = res;
      if (status !== 200) {
        return null;
      }

      return this.toHeroProfileResponse(data);
    } catch (error: unknown) {
      this.logger.error(error);
      return null;
    }
  }

  private toHeroResponse(data: unknown): HeroApiResponse | null {
    if (this.heroApiResponseValidator(data)) {
      return data;
    }
    this.logger.error(this.heroApiResponseValidator.errors);
    return null;
  }

  private toHeroProfileResponse(data: unknown): HeroProfileApiResponse | null {
    if (this.heroProfileApiResponseValidator(data)) {
      return data;
    }
    this.logger.error(this.heroProfileApiResponseValidator.errors);
    return null;
  }
}
