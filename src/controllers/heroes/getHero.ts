import { Request, Response } from 'express';
import { hahowRecruitApi } from '#apiRequests';
import { isNumericID, logger } from '#utils';

export async function getHero(req: Request, res: Response): Promise<void> {
  try {
    const { heroID } = req.params;
    if (!isNumericID(heroID)) {
      res.sendStatus(404);
      return;
    }
    const { auth } = res.locals;

    const { data: hero } = await hahowRecruitApi.getHero(heroID);
    if (auth !== true) {
      res.status(200).json(hero);
      return;
    }

    const { data: profile } = await hahowRecruitApi.getHeroProfile(heroID);

    res.status(200).json({ ...hero, profile });
  } catch (error: unknown) {
    logger.error(error);
    res.sendStatus(500);
  }
}
