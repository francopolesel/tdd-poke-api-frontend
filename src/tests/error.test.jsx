import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

jest.mock('../services/axiosInstance', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

describe('Error state', () => {
  beforeEach(() => {
    const pokeApi = require('../services/axiosInstance').default;
    // Mockeamos get para que falle
    pokeApi.get.mockRejectedValue(new Error('Request failed with status code 500'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('muestra mensaje de error amigable cuando la API falla', async () => {
    render(<App />);
    await waitFor(() => {
      expect(
        screen.getByText(/no se pudieron cargar/i),
      ).toBeInTheDocument();
    });
  });
});
