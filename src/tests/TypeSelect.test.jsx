import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TypeSelect from '../components/TypeSelect';

describe('TypeSelect', () => {
  const tipos = [
    { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
    { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
    { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
  ];

  test('renderiza un select con las opciones de tipos recibidas', () => {
    render(<TypeSelect tipos={tipos} onChange={() => {}} />);

    const select = screen.getByLabelText(/tipo/i);
    expect(select).toBeInTheDocument();

    // Opción por defecto "Todos"
    expect(screen.getByText(/todos/i)).toBeInTheDocument();
    expect(screen.getByText(/fire/i)).toBeInTheDocument();
    expect(screen.getByText(/water/i)).toBeInTheDocument();
    expect(screen.getByText(/grass/i)).toBeInTheDocument();
  });

  test('dispara onChange al seleccionar un tipo', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<TypeSelect tipos={tipos} onChange={handleChange} />);

    const select = screen.getByLabelText(/tipo/i);
    await user.selectOptions(select, 'fire');

    expect(handleChange).toHaveBeenCalledWith('fire');
  });
});
