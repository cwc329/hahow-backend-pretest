import { HeroProfileApiResponse } from '#apiRequests';

export function makeHeroProfileApiResponse(data?: Partial<HeroProfileApiResponse>): HeroProfileApiResponse {
  const str = data?.str ?? 1;
  const agi = data?.agi ?? 1;
  const int = data?.int ?? 1;
  const luk = data?.luk ?? 1;

  return {
    str,
    agi,
    int,
    luk,
  };
}
