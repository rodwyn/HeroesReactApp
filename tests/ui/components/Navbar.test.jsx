import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { Navbar } from "../../../src/ui/components";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=> mockedUseNavigate
}));

describe('Testing <Navbar >', () => {
  const contextValue = {
    logged: true,
    user: {
      name: 'Pikachu',
      id: 123
    },
    logout: jest.fn()
  };

  beforeEach(() => jest.clearAllMocks());

  test('should render username.', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    
    expect(screen.getByText('Pikachu')).toBeTruthy();
  });

  test('should call logout.', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn);
    
    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});
  });
});