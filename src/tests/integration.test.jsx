import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../components/App';

// Helper: crea mock responses
const mockTypesResponse = {
  results: [
    { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
    { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
  ],
};

const mockGenerationsResponse = {
  results: [
    { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
    { name: 'generation-ii', url: 'https://pokeapi.co/api/v2/generation/2/' },
  ],
};

const mockPokemonListResponse = {
  results: [
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
  ],
};

const mockCharmander = {
  id: 4,
  name: 'charmander',
  types: [{ type: { name: 'fire' } }],
  sprites: { front_default: 'https://example.com/charmander.png' },
};

const mockSquirtle = {
  id: 7,
  name: 'squirtle',
  types: [{ type: { name: 'water' } }],
  sprites: { front_default: 'https://example.com/squirtle.png' },
};

const mockPikachu = {
  id: 25,
  name: 'pikachu',
  types: [{ type: { name: 'electric' } }],
  sprites: { front_default: 'https://example.com/pikachu.png' },
};

const mockFireTypeResponse = {
  pokemon: [
    { pokemon: { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' } },
  ],
};

const mockGenIResponse = {
  pokemon_species: [
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon-species/4/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon-species/7/' },
    { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon-species/25/' },
  ],
};

/**
 * Helper para mockear fetch basado en la URL solicitada.
 */
function setupFetchMock() {
  global.fetch = jest.fn((url) => {
    if (url === 'https://pokeapi.co/api/v2/type') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTypesResponse),
      });
    }
    if (url === 'https://pokeapi.co/api/v2/generation') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGenerationsResponse),
      });
    }
    if (url === 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPokemonListResponse),
      });
    }
    if (url === 'https://pokeapi.co/api/v2/pokemon/charmander') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCharmander),
      });
    }
    if (url === 'https://pokeapi.co/api/v2/pokemon/squirtle') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockSquirtle),
      });
    }
    if (url === 'https://pokeapi.co/api/v2/pokemon/pikachu') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPikachu),
      });
    }
    if (url === 'https://pokeapi.co/api/v2/type/fire') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockFireTypeResponse),
      });
    }
    if (url === 'https://pokeapi.co/api/v2/generation/1') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockGenIResponse),
      });
    }
    // Default: pokémon detail fallback
    if (url.startsWith('https://pokeapi.co/api/v2/pokemon/')) {
      const name = url.split('/').filter(Boolean).pop();
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 999,
            name,
            types: [{ type: { name: 'normal' } }],
            sprites: { front_default: null },
          }),
      });
    }
    return Promise.reject(new Error(`URL no mockeada: ${url}`));
  });
}

describe('Integration: filtrar por tipo + generación', () => {
  beforeEach(() => {
    setupFetchMock();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('carga inicial muestra pokémon, tipos y generaciones en los selects', async () => {
    render(<App />);

    // Esperar a que se carguen los pokémon
    await waitFor(() => {
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    });

    // Verificar que los selects de tipo y generación están
    expect(screen.getByLabelText(/tipo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/generación/i)).toBeInTheDocument();

    // Verificar opciones de tipo (puede aparecer en cards y en select, usamos getAllByText)
    expect(screen.getAllByText(/fire/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/water/i).length).toBeGreaterThanOrEqual(1);
  });

  test('al seleccionar tipo "fire", solo se muestran pokémon de fuego', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Esperar carga inicial
    await waitFor(() => {
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    });

    // Seleccionar tipo fire
    const tipoSelect = screen.getByLabelText(/tipo/i);
    await user.selectOptions(tipoSelect, 'fire');

    // Esperar que se filtre
    await waitFor(() => {
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    });

    // squirtle y pikachu no deberían verse
    expect(screen.queryByText(/squirtle/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
  });

  test('al seleccionar tipo + generación se filtra correctamente', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Esperar carga inicial
    await waitFor(() => {
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    });

    // Seleccionar tipo fire
    const tipoSelect = screen.getByLabelText(/tipo/i);
    await user.selectOptions(tipoSelect, 'fire');

    // Seleccionar generación I
    const genSelect = screen.getByLabelText(/generación/i);
    await user.selectOptions(genSelect, 'generation-i');

    // charmander es fire + gen-i, debería verse
    await waitFor(() => {
      expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    });
  });
});
