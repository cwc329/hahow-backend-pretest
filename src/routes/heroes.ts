import { Router } from 'express';
import * as heroesControllers from '#controllers/heroes';
import { API } from '#enums';
import { authMiddleware } from '#middlewares';

const heroes = Router();

heroes.get(API.HEROES, authMiddleware, heroesControllers.getHeroes);
heroes.get(API.HERO, authMiddleware, heroesControllers.getHero);

export { heroes };
