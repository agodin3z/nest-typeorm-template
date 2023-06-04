import { AbstractFactory } from './abstract.factory';

class MockFactory extends AbstractFactory<any> {
  make(input?: unknown): Promise<any> {
    return Promise.resolve(input);
  }
  makeMany(factorial: number, input: unknown): Promise<any[]> {
    return Promise.all([...Array(factorial)].map(() => this.make(input)));
  }
}

describe('AbstractFactory', () => {
  let factory: AbstractFactory<any>;

  beforeEach(() => {
    // Create a mock implementation of the abstract factory class
    factory = new MockFactory();
  });

  describe('make()', () => {
    it('should return a promise that resolves to an object', async () => {
      const result = await factory.make({});
      expect(typeof result).toBe('object');
    });

    it('should return a promise that resolves to the given input', async () => {
      const input = { test: 'input' };
      const result = await factory.make(input);
      expect(result).toEqual(input);
    });
  });

  describe('makeMany()', () => {
    it('should return a promise that resolves to an array', async () => {
      const result = await factory.makeMany(5, {});
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return a promise that resolves to an array of length equal to the factorial of the input', async () => {
      const result = await factory.makeMany(24, {});
      expect(result.length).toBe(24);
    });

    it('should return a promise that resolves to an array of objects', async () => {
      const result = await factory.makeMany(3, {});
      result.forEach((item) => expect(typeof item).toBe('object'));
    });
  });
});
