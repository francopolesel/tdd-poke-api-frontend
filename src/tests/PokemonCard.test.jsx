import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonCard from '../components/PokemonCard';

describe('PokemonCard', () => {
  const pokemon = {
    id: 25,
    name: 'pikachu',
    types: [{ type: { name: 'electric' } }],
    sprites: { front_default: 'https://example.com/pikachu.png' },
  };

  test('muestra el nombre del pokémon capitalizado', () => {
    render(<PokemonCard pokemon={pokemon} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('muestra el id del pokémon', () => {
    render(<PokemonCard pokemon={pokemon} />);
    expect(screen.getByText(/#025/)).toBeInTheDocument();
  });

  test('muestra los tipos del pokémon', () => {
    render(<PokemonCard pokemon={pokemon} />);
    expect(screen.getByText(/electric/i)).toBeInTheDocument();
  });

  test('muestra la imagen sprite si existe', () => {
    render(<PokemonCard pokemon={pokemon} />);
    const img = screen.getByAltText(/pikachu/i);
    expect(img).toHaveAttribute('src', 'https://example.com/pikachu.png');
  });

  test('muestra placeholder si no hay sprite', () => {
    const pokeSinSprite = {
      ...pokemon,
      sprites: { front_default: null },
    };
    render(<PokemonCard pokemon={pokeSinSprite} />);
    expect(screen.getByText(/sin imagen/i)).toBeInTheDocument();
  });
});
