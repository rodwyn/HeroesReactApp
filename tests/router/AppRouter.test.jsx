import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";


describe('Testing <AppRouter>', () => { 
  test('should render login if it is not logged.', () => { 
    const contextValue = {
      logged: false
    };

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
   });

   test('should render marvel page if it is logged.', () => {
    Storage.prototype.setItem = jest.fn();
    const contextValue = {
      logged: true,
      user: {
        name: 'Pikachu',
        id: 123
      }
    };

    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('MarvelPage')).toBeTruthy();
   });
 })