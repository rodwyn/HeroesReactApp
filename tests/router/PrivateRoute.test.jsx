import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('Testing <PrivateRoute >', () => { 
  test('should render children if it is logged.', () => {
    Storage.prototype.setItem = jest.fn();
    const contextValue = {
      logged: true,
      user: {
        name: 'Pikachu',
        id: 123
      }
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Private Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    
    expect(screen.getByText('Private Route')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/search?q=batman");
  }); 
})