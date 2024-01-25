export function isNumericID(id: string | number): id is number {
  return !!id && Number(id) > 0 && /^\d+$/.test(`${id}`);
}
