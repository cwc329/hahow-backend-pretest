import { hahowRecruitInstance } from './hahowRecruitInstance';

// TODO Handle 4XX, 5XX errors
export const auth = async (name: string, password: string) => hahowRecruitInstance.post(
  '/auth',
  {
    name,
    password,
  },
);

// TODO Hero schema check
export const getHeroes = async () => hahowRecruitInstance.get(
  '/heroes',
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
);

export const getHero = async (heroID: number) => hahowRecruitInstance.get(
  `/heroes/${heroID}`,
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
);

export const getHeroProfile = async (heroID: number) => hahowRecruitInstance.get(
  `/heroes/${heroID}/profile`,
  {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
);
