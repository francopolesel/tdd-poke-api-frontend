import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GenerationSelect from '../components/GenerationSelect';

describe('GenerationSelect', () => {
  const generaciones = [
    { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
    { name: 'generation-ii', url: 'https://pokeapi.co/api/v2/generation/2/' },
    { name: 'generation-iii', url: 'https://pokeapi.co/api/v2/generation/3/' },
  ];

  test('renderiza un select con las generaciones recibidas', () => {
    render(<GenerationSelect generaciones={generaciones} onChange={() => {}} />);

    const select = screen.getByLabelText(/generación/i);
    expect(select).toBeInTheDocument();

    // Opción por defecto "Todas"
    expect(screen.getByText(/todas/i)).toBeInTheDocument();
    // Usamos getAllByText porque los regex de generación matchean múltiples opciones
    const opciones = select.querySelectorAll('option');
    const valores = [...opciones].map((o) => o.value);
    expect(valores).toContain('generation-i');
    expect(valores).toContain('generation-ii');
    expect(valores).toContain('generation-iii');
  });

  test('dispara onChange al seleccionar una generación', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <GenerationSelect generaciones={generaciones} onChange={handleChange} />,
    );

    const select = screen.getByLabelText(/generación/i);
    await user.selectOptions(select, 'generation-ii');

    expect(handleChange).toHaveBeenCalledWith('generation-ii');
  });
});
