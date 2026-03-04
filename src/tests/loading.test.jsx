import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

jest.mock('../services/axiosInstance', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

describe('Loading state', () => {
  beforeEach(() => {
    const pokeApi = require('../services/axiosInstance').default;
    // Mockeamos get para que nunca resuelva (queda en loading)
    pokeApi.get.mockImplementation(() => new Promise(() => {}));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('muestra el loader al renderizar mientras carga datos', () => {
    render(<App />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });
});
