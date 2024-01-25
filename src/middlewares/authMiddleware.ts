import { NextFunction, Request, Response } from 'express';
import { AuthPayload } from './payloads';
import { hahowRecruitApi } from '#apiRequests';
import { logger } from '#utils';

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

    const authRes = await hahowRecruitApi.auth(`${name}`, `${password}`);
    const { status } = authRes;
    if (status === 200) {
      res.locals.auth = true;
    }

    next();
  } catch (err: unknown) {
    logger.error(err);
    res.sendStatus(500);
  }
}
