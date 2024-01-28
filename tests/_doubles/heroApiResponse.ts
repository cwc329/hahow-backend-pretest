import { HeroApiResponse } from '#apiRequests';

export function makeHeroApiResponse(data?: Partial<HeroApiResponse>): HeroApiResponse{
  const id = data?.id ?? '1';
  const name = data?.id ?? 'Daredevil';
  const image = data?.image ?? 'https://example.com/1.png';
  return {
    id,
    name,
    image,
  };
}
