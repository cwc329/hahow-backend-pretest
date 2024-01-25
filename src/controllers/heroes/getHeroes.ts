import { Request, Response } from 'express';
import { logger } from '#utils';
import { hahowRecruitApi } from '#apiRequests';

export async function getHeroes(_req: Request, res: Response): Promise<void> {
  try {
    const { auth } = res.locals;

    const { data: heroes } = await hahowRecruitApi.getHeroes();
    if (auth !== true) {
      res.status(200).json(heroes);
      return;
    }

    // TODO add type
    const heroesWithProfile = await Promise.all(heroes.map(async (hero: { id: number }) => {
      const { data: profile } = await hahowRecruitApi.getHeroProfile(hero.id);
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
