import '@testing-library/jest-dom';
import pokeApi from '../services/axiosInstance';
import {
  getTypes,
  getGenerations,
  getPokemonsByType,
  getPokemonsByGeneration,
  getPokemonDetail,
  getPokemonList,
} from '../services/pokeService';

jest.mock('../services/axiosInstance', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('pokeService', () => {
  test('getTypes() devuelve lista de tipos obtenida de la API', async () => {
    const mockData = {
      results: [
        { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
        { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
      ],
    };
    pokeApi.get.mockResolvedValueOnce({ data: mockData });

    const tipos = await getTypes();
    expect(pokeApi.get).toHaveBeenCalledWith('/type');
    expect(tipos).toEqual([
      { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' },
      { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' },
    ]);
  });

  test('getGenerations() devuelve lista de generaciones obtenida de la API', async () => {
    const mockData = {
      results: [
        { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
        { name: 'generation-ii', url: 'https://pokeapi.co/api/v2/generation/2/' },
      ],
    };
    pokeApi.get.mockResolvedValueOnce({ data: mockData });

    const generaciones = await getGenerations();
    expect(pokeApi.get).toHaveBeenCalledWith('/generation');
    expect(generaciones).toEqual([
      { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
      { name: 'generation-ii', url: 'https://pokeapi.co/api/v2/generation/2/' },
    ]);
  });

  test('getPokemonsByType() devuelve pokémon filtrados por tipo', async () => {
    const mockData = {
      pokemon: [
        { pokemon: { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' } },
        { pokemon: { name: 'vulpix', url: 'https://pokeapi.co/api/v2/pokemon/37/' } },
      ],
    };
    pokeApi.get.mockResolvedValueOnce({ data: mockData });

    const pokemon = await getPokemonsByType('fire');
    expect(pokeApi.get).toHaveBeenCalledWith('/type/fire');
    expect(pokemon).toEqual([
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'vulpix', url: 'https://pokeapi.co/api/v2/pokemon/37/' },
    ]);
  });

  test('getPokemonsByGeneration() devuelve pokémon de una generación', async () => {
    const mockData = {
      pokemon_species: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon-species/4/' },
      ],
    };
    pokeApi.get.mockResolvedValueOnce({ data: mockData });

    const pokemon = await getPokemonsByGeneration(1);
    expect(pokeApi.get).toHaveBeenCalledWith('/generation/1');
    expect(pokemon).toEqual([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon-species/4/' },
    ]);
  });

  test('getPokemonDetail() devuelve detalle de un pokémon', async () => {
    const mockData = {
      id: 25,
      name: 'pikachu',
      types: [{ type: { name: 'electric' } }],
      sprites: { front_default: 'https://example.com/pikachu.png' },
    };
    pokeApi.get.mockResolvedValueOnce({ data: mockData });

    const detail = await getPokemonDetail('pikachu');
    expect(pokeApi.get).toHaveBeenCalledWith('/pokemon/pikachu');
    expect(detail).toEqual(mockData);
  });

  test('getPokemonList() devuelve listado paginado de pokémon', async () => {
    const mockData = {
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ],
    };
    pokeApi.get.mockResolvedValueOnce({ data: mockData });

    const pokemon = await getPokemonList(151, 0);
    expect(pokeApi.get).toHaveBeenCalledWith('/pokemon', {
      params: { limit: 151, offset: 0 },
    });
    expect(pokemon).toEqual([
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    ]);
  });

  test('lanza error cuando la API falla', async () => {
    pokeApi.get.mockRejectedValueOnce(new Error('Request failed with status code 500'));

    await expect(getTypes()).rejects.toThrow('Request failed with status code 500');
  });
});
