// src/api/pokeApi.js
// Cliente para la PokeAPI — consume endpoints públicos (sin API key)

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Helper interno para hacer fetch y manejar errores.
 */
async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error al consultar la API: ${response.status}`);
  }
  return response.json();
}

/**
 * Obtiene la lista de tipos de pokémon.
 * Endpoint: GET /type
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getTypes() {
  const data = await fetchJSON(`${BASE_URL}/type`);
  return data.results;
}

/**
 * Obtiene la lista de generaciones.
 * Endpoint: GET /generation
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getGenerations() {
  const data = await fetchJSON(`${BASE_URL}/generation`);
  return data.results;
}

/**
 * Obtiene los pokémon de un tipo específico.
 * Endpoint: GET /type/{name}
 * @param {string} typeName - Nombre del tipo (ej: "fire")
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getPokemonsByType(typeName) {
  const data = await fetchJSON(`${BASE_URL}/type/${typeName}`);
  return data.pokemon.map((entry) => entry.pokemon);
}

/**
 * Obtiene los pokémon de una generación específica.
 * Endpoint: GET /generation/{id}
 * @param {number|string} genId - ID o nombre de la generación
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getPokemonsByGeneration(genId) {
  const data = await fetchJSON(`${BASE_URL}/generation/${genId}`);
  return data.pokemon_species;
}

/**
 * Obtiene el detalle de un pokémon por nombre o id.
 * Endpoint: GET /pokemon/{name_or_id}
 * @param {string|number} nameOrId
 * @returns {Promise<Object>}
 */
export async function getPokemonDetail(nameOrId) {
  return fetchJSON(`${BASE_URL}/pokemon/${nameOrId}`);
}

/**
 * Obtiene un listado paginado de pokémon.
 * Endpoint: GET /pokemon?limit=151&offset=0
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getPokemonList(limit = 151, offset = 0) {
  const data = await fetchJSON(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );
  return data.results;
}
