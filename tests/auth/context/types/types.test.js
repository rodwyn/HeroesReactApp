import { types } from "../../../../src/auth/types/types";

describe('Testing types.', () => {
  test('should return types.', () => {
    expect(types).toEqual({
      login: 'login',
      logout: 'logout'
    });
  });
});