import pokeApi from './axiosInstance';

/**
 * Obtiene la lista de tipos de pokémon.
 * Endpoint: GET /type
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getTypes() {
  const { data } = await pokeApi.get('/type');
  return data.results;
}

/**
 * Obtiene la lista de generaciones.
 * Endpoint: GET /generation
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getGenerations() {
  const { data } = await pokeApi.get('/generation');
  return data.results;
}

/**
 * Obtiene los pokémon de un tipo específico.
 * Endpoint: GET /type/{name}
 * @param {string} typeName - Nombre del tipo (ej: "fire")
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getPokemonsByType(typeName) {
  const { data } = await pokeApi.get(`/type/${typeName}`);
  return data.pokemon.map((entry) => entry.pokemon);
}

/**
 * Obtiene los pokémon de una generación específica.
 * Endpoint: GET /generation/{id}
 * @param {number|string} genId - ID o nombre de la generación
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getPokemonsByGeneration(genId) {
  const { data } = await pokeApi.get(`/generation/${genId}`);
  return data.pokemon_species;
}

/**
 * Obtiene el detalle de un pokémon por nombre o id.
 * Endpoint: GET /pokemon/{name_or_id}
 * @param {string|number} nameOrId
 * @returns {Promise<Object>}
 */
export async function getPokemonDetail(nameOrId) {
  const { data } = await pokeApi.get(`/pokemon/${nameOrId}`);
  return data;
}

/**
 * Obtiene un listado paginado de pokémon.
 * Endpoint: GET /pokemon?limit=151&offset=0
 * @param {number} limit
 * @param {number} offset
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
export async function getPokemonList(limit = 151, offset = 0) {
  const { data } = await pokeApi.get('/pokemon', {
    params: { limit, offset },
  });
  return data.results;
}
