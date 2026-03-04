import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonList from '../components/PokemonList';

describe('PokemonList', () => {
  const pokemonData = [
    {
      id: 1,
      name: 'bulbasaur',
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      sprites: { front_default: 'https://example.com/bulbasaur.png' },
    },
    {
      id: 4,
      name: 'charmander',
      types: [{ type: { name: 'fire' } }],
      sprites: { front_default: 'https://example.com/charmander.png' },
    },
    {
      id: 7,
      name: 'squirtle',
      types: [{ type: { name: 'water' } }],
      sprites: { front_default: null },
    },
  ];

  test('renderiza una card por cada pokémon en la lista', () => {
    render(<PokemonList pokemon={pokemonData} />);

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.getByText(/squirtle/i)).toBeInTheDocument();
  });

  test('muestra mensaje cuando la lista está vacía', () => {
    render(<PokemonList pokemon={[]} />);
    expect(
      screen.getByText(/no se encontraron pokémon/i),
    ).toBeInTheDocument();
  });
});
