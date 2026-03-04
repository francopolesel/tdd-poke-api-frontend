import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchInput from '../components/SearchInput';

describe('SearchInput', () => {
  test('renderiza un input de búsqueda con placeholder en español', () => {
    render(<SearchInput onSearch={() => {}} />);
    const input = screen.getByPlaceholderText(/buscá un pokémon/i);
    expect(input).toBeInTheDocument();
  });

  test('dispara onSearch al escribir texto', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();

    render(<SearchInput onSearch={handleSearch} />);

    const input = screen.getByPlaceholderText(/buscá un pokémon/i);
    await user.type(input, 'pika');

    // Se llama por cada tecla
    expect(handleSearch).toHaveBeenLastCalledWith('pika');
  });
});
