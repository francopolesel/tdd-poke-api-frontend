// src/utils/filter.js
// Funciones de filtrado para la Pokédex

/**
 * Filtra una lista de pokémon por texto de búsqueda.
 * Busca en nombre y en tipos (case insensitive).
 *
 * @param {Array} pokemonList - Lista de pokémon con { name, types: [{ type: { name } }] }
 * @param {string} texto - Texto a buscar
 * @returns {Array} Lista filtrada
 */
export function filtrarPorBusqueda(pokemonList, texto) {
  if (!texto || texto.trim() === '') return pokemonList;

  const termino = texto.toLowerCase().trim();

  return pokemonList.filter((poke) => {
    const coincideNombre = poke.name.toLowerCase().includes(termino);
    const coincideTipo = poke.types.some((t) =>
      t.type.name.toLowerCase().includes(termino),
    );
    return coincideNombre || coincideTipo;
  });
}
