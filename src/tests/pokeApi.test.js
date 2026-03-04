import '@testing-library/jest-dom';

// Mockeamos fetch global
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('pokeApi', () => {
  test('getTypes() devuelve lista de tipos obtenida de la API', async () => {
    const { getTypes } = await import('../api/pokeApi');

    const mockResponse = {
      results: [
        { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
        { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
      ],
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const tipos = await getTypes();
    expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type');
    expect(tipos).toEqual([
      { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
      { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
    ]);
  });

  test('getGenerations() devuelve lista de generaciones obtenida de la API', async () => {
    // Re-importamos para tener el módulo fresco
    const { getGenerations } = await import('../api/pokeApi');

    const mockResponse = {
      results: [
        { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
        { name: 'generation-ii', url: 'https://pokeapi.co/api/v2/generation/2/' },
      ],
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const generaciones = await getGenerations();
    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/generation',
    );
    expect(generaciones).toEqual([
      { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
      { name: 'generation-ii', url: 'https://pokeapi.co/api/v2/generation/2/' },
    ]);
  });

  test('getPokemonsByType() devuelve pokémon filtrados por tipo', async () => {
    const { getPokemonsByType } = await import('../api/pokeApi');

    const mockResponse = {
      pokemon: [
        { pokemon: { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' } },
        { pokemon: { name: 'vulpix', url: 'https://pokeapi.co/api/v2/pokemon/37/' } },
      ],
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const pokemon = await getPokemonsByType('fire');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/type/fire',
    );
    expect(pokemon).toEqual([
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'vulpix', url: 'https://pokeapi.co/api/v2/pokemon/37/' },
    ]);
  });

  test('getPokemonsByGeneration() devuelve pokémon de una generación', async () => {
    const { getPokemonsByGeneration } = await import('../api/pokeApi');

    const mockResponse = {
      pokemon_species: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon-species/4/' },
      ],
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const pokemon = await getPokemonsByGeneration(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/generation/1',
    );
    expect(pokemon).toEqual([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon-species/4/' },
    ]);
  });

  test('getPokemonDetail() devuelve detalle de un pokémon', async () => {
    const { getPokemonDetail } = await import('../api/pokeApi');

    const mockResponse = {
      id: 25,
      name: 'pikachu',
      types: [{ type: { name: 'electric' } }],
      sprites: { front_default: 'https://example.com/pikachu.png' },
    };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const detail = await getPokemonDetail('pikachu');
    expect(global.fetch).toHaveBeenCalledWith(
      'https://pokeapi.co/api/v2/pokemon/pikachu',
    );
    expect(detail).toEqual(mockResponse);
  });
});
