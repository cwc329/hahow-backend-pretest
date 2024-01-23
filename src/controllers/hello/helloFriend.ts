import { Request, Response } from 'express';
import { logger } from '#utils';

export async function helloFriend(_req: Request, res: Response): Promise<void> {
  try {
    res.status(200).send('hello darkness, my old friend.');
  } catch (error: unknown) {
    logger.error(error);
    res.sendStatus(500);
  }
}
