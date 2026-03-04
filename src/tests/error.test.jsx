import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

describe('Error state', () => {
  beforeEach(() => {
    // Mockeamos fetch para que falle
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({}),
      }),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
