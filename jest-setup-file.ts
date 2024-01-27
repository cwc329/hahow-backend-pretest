// mock logger
jest.mock('#utils/logger', () => {
  return {
    logger: {
      error: jest.fn(),
      info: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
    },
  };
});
