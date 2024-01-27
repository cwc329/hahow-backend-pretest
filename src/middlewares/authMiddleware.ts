import { NextFunction, Request, Response } from 'express';
import { AuthPayload } from './payloads';
import { logger } from '#utils';
import { HahowRecruitApi } from '#apiRequests';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authPayload = new AuthPayload(req);
    const { name, password } = authPayload;
    if (!authPayload.isValid()) {
      next();
      return;
    }

    const api = new HahowRecruitApi();
    res.locals.auth = await api.auth(name, password);

    next();
  } catch (err: unknown) {
    logger.error(err);
    res.sendStatus(500);
  }
}
