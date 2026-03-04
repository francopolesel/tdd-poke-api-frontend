import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

jest.mock('../services/axiosInstance', () => ({
  __esModule: true,
  default: { get: jest.fn(() => new Promise(() => {})) },
}));

describe('App', () => {
  test('muestra el título "Pokédex Argentina" al renderizar', () => {
    render(<App />);
    expect(screen.getByText(/pokédex argentina/i)).toBeInTheDocument();
  });
});
