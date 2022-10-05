import { AuthReducer } from "../../../src/auth/context/AuthReducer";
import { types } from "../../../src/auth/types/types";

describe('Testing AuthReducer', () => {
  test('should return default state.', () => {
    const state = AuthReducer({logged: false}, {});

    expect(state).toEqual({logged: false});
  });

  test('should call login', () => {
    const user = { id: 123, name: 'Rodwyn' };
    const action = {
      type: types.login,
      payload: user
    };
    const state = AuthReducer({logged: false}, action);

    expect(state).toEqual({
      logged: true,
      user: action.payload
    });
  });

  test('should call logout', () => {
    const action = {
      type: types.logout
    };

    const state = AuthReducer({logged: false}, action);

    expect(state).toEqual({logged: false});
  });
});
