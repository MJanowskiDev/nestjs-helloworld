import { FunctionalLoggerMiddleware } from './functional-logger.middleware';

describe('FunctionalLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new FunctionalLoggerMiddleware()).toBeDefined();
  });
});
