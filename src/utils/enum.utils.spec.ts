import { UserGender } from './enum.utils';

// Test suite for UserGender
describe('UserGender', () => {
  // Test case for UserGender values
  test('values', () => {
    expect(UserGender.M).toEqual('M');
    expect(UserGender.F).toEqual('F');
    expect(UserGender.O).toEqual('O');
  });
});
