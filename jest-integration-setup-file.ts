// mock morgan for better console reading experience
jest.mock('morgan', () => (() => {
  return (_req, _res, next) => next();
}));
