// Test 1: App muestra el título de la pokédex en español
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

describe('App', () => {
  test('muestra el título "Pokédex Argentina" al renderizar', () => {
    render(<App />);
    expect(screen.getByText(/pokédex argentina/i)).toBeInTheDocument();
  });
});
