import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=> mockedUseNavigate
}));

beforeEach(() => jest.clearAllMocks());

describe('Testing <SearchPage />.', () => {
  test('should render correctly with default values.', () => {
    const {container} = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )

    expect(container).toMatchSnapshot();
  });

  test('should render batman card.', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox');
    const img = screen.getByRole('img');
    expect(input.value).toBe('batman');
    expect(img.src).toContain('/assets/heroes/dc-batman.jpg');
  });

  test('should render alert on none result.', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=xyx']}>
        <SearchPage />
      </MemoryRouter>
    )

    const alert = screen.getByLabelText('not-hero');
    expect(alert).toBeTruthy();
  });

  test('should call navigate to hero page.', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    
    const input = screen.getByLabelText('search');
    fireEvent.change(input, {target: { name: 'searchText', value: 'batman'}})
    fireEvent.submit(input)
    expect(mockedUseNavigate).toHaveBeenCalledWith('?q=batman');
  });
});