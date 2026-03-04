// Test 10: Loading state se muestra mientras se espera respuesta
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

describe('Loading state', () => {
  beforeEach(() => {
    // Mockeamos fetch para que nunca resuelva (queda en loading)
    global.fetch = jest.fn(
      () => new Promise(() => {}), // pending forever
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('muestra el loader al renderizar mientras carga datos', () => {
    render(<App />);
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });
});
