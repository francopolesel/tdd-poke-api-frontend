// Test 9: Filtro por generación — lógica pura (unit)
import '@testing-library/jest-dom';

// Testeamos la función de filtrado pura
describe('filtrarPorBusqueda (lógica pura)', () => {
  // Importamos la función utilitaria
  let filtrarPorBusqueda;

  beforeAll(async () => {
    const mod = await import('../utils/filter');
    filtrarPorBusqueda = mod.filtrarPorBusqueda;
  });

  const pokemonList = [
    {
      id: 1,
      name: 'bulbasaur',
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
    },
    {
      id: 4,
      name: 'charmander',
      types: [{ type: { name: 'fire' } }],
    },
    {
      id: 25,
      name: 'pikachu',
      types: [{ type: { name: 'electric' } }],
    },
  ];

  test('filtra por nombre parcial (case insensitive)', () => {
    const result = filtrarPorBusqueda(pokemonList, 'char');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('charmander');
  });

  test('filtra por tipo', () => {
    const result = filtrarPorBusqueda(pokemonList, 'grass');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('bulbasaur');
  });

  test('devuelve todos si el texto está vacío', () => {
    const result = filtrarPorBusqueda(pokemonList, '');
    expect(result).toHaveLength(3);
  });

  test('devuelve vacío si no hay coincidencia', () => {
    const result = filtrarPorBusqueda(pokemonList, 'mewtwo');
    expect(result).toHaveLength(0);
  });
});
