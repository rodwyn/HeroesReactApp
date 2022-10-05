import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from "../../src/router/PublicRoute";


describe('Testing <PublicRoute />', () => {
  test('should render children if it is not logged.', () => {
    const contextValue = { logged: false };
    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public Route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    
    expect(screen.getByText('Public Route')).toBeTruthy();
  });

  test('should navigate if it is logged', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Pikachu',
        id: 123
      }
    };
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="login" element={
              <PublicRoute>
                <h1>Public Route</h1>
              </PublicRoute>
            } />
            <Route path="/" element={<h1>Marvel Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    
    expect(screen.getByText('Marvel Page')).toBeTruthy();
  });
});