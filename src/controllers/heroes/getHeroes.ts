import { Request, Response } from 'express';
import { HahowRecruitApi } from '#apiRequests';
import { logger } from '#utils';

export async function getHeroes(_req: Request, res: Response): Promise<void> {
  try {
    const { auth } = res.locals;
    const api = new HahowRecruitApi();

    const heroes = await api.getHeroes();
    if (auth !== true) {
      res.status(200).json(heroes);
      return;
    }

    const heroesWithProfile = await Promise.all(heroes.map(async (hero) => {
      const profile = await api.getHeroProfile(Number(hero.id));
      if (!profile) return hero;
      return {
        ...hero,
        profile,
      };
    }));
    res.status(200).json(heroesWithProfile);
  } catch (error: unknown) {
    logger.error(error);
    res.sendStatus(500);
  }
}
