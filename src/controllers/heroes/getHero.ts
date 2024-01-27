import { Request, Response } from 'express';
import { HahowRecruitApi } from '#apiRequests';
import { isNumericID, logger } from '#utils';

export async function getHero(req: Request, res: Response): Promise<void> {
  try {
    const { heroID } = req.params;
    if (!isNumericID(heroID)) {
      res.sendStatus(404);
      return;
    }
    const { auth } = res.locals;

    const api = new HahowRecruitApi();
    const hero = await api.getHero(heroID);

    if (!hero) {
      res.sendStatus(404);
      return;
    }
    if (!auth) {
      res.status(200).json(hero);
      return;
    }
    const profile = await api.getHeroProfile(heroID);

    res.status(200).json({ ...hero, profile });
  } catch (error: unknown) {
    logger.error(error);
    res.sendStatus(500);
  }
}
