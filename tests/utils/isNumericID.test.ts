import { isNumericID } from '#utils';

describe('valid ids', () => {
  it('should return true when nature numbers', () => {
    const id = 1;
    expect(isNumericID(id)).toBe(true);
  });

  it('should true when nature number strings', () => {
    const id = '1';
    expect(isNumericID(id)).toBe(true);
  });
});

describe('invalid ids', () => {
  it('should false when zero', () => {
    const id = 0;
    expect(isNumericID(id)).toBe(false);
  });

  it('should return false when string zero', () => {
    const id = '0';
    expect(isNumericID(id)).toBe(false);
  });

  it('should return false when negative number', () => {
    const id = -1;
    expect(isNumericID(id)).toBe(false);
  });

  it('should return false when decimal number', () => {
    const id = 1.1;
    expect(isNumericID(id)).toBe(false);
  });

  it('should return false when non-numeric string', () => {
    const id = 'one';
    expect(isNumericID(id)).toBe(false);
  });
});
