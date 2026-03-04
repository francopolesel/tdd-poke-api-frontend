import { useState, useEffect, useCallback } from 'react';
import '../styles/App.css';
import {
  getTypes,
  getGenerations,
  getPokemonList,
  getPokemonDetail,
  getPokemonsByType,
  getPokemonsByGeneration,
} from '../services/pokeService';
import { filtrarPorBusqueda } from '../utils/filter';
import TypeSelect from './TypeSelect';
import GenerationSelect from './GenerationSelect';
import SearchInput from './SearchInput';
import PokemonList from './PokemonList';
import Pagination from './Pagination';

/**
 * Obtiene detalles de pokémon en lotes para no saturar la API.
 * Los pokémon que fallen individualmente se omiten.
 */
async function fetchDetallesEnLotes(nombres, tamLote = 20) {
  const resultados = [];
  for (let i = 0; i < nombres.length; i += tamLote) {
    const lote = nombres.slice(i, i + tamLote);
    const resultadosLote = await Promise.allSettled(
      lote.map((name) => getPokemonDetail(name)),
    );
    for (const r of resultadosLote) {
      if (r.status === 'fulfilled') {
        resultados.push(r.value);
      }
    }
  }
  return resultados;
}

export default function App() {
  const [tipos, setTipos] = useState([]);
  const [generaciones, setGeneraciones] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [generacionSeleccionada, setGeneracionSeleccionada] = useState('');
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const POKEMON_POR_PAGINA = 20;

  // Carga inicial: tipos, generaciones y pokémon base
  useEffect(() => {
    async function cargarDatosIniciales() {
      try {
        setCargando(true);
        setError(null);

        const [tiposData, generacionesData, pokemonListData] =
          await Promise.all([getTypes(), getGenerations(), getPokemonList()]);

        setTipos(tiposData);
        setGeneraciones(generacionesData);

        // Obtener detalles de cada pokémon (en lotes)
        const detalles = await fetchDetallesEnLotes(
          pokemonListData.map((p) => p.name),
        );

        setPokemon(detalles);
      } catch (err) {
        setError('No se pudieron cargar los datos. Intentá de nuevo más tarde.');
      } finally {
        setCargando(false);
      }
    }

    cargarDatosIniciales();
  }, []);

  // Cuando cambia tipo o generación, re-filtrar
  const cargarFiltrados = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);

      let pokemonNombres = null;

      // Filtrar por tipo
      if (tipoSeleccionado) {
        const porTipo = await getPokemonsByType(tipoSeleccionado);
        pokemonNombres = new Set(porTipo.map((p) => p.name));
      }

      // Filtrar por generación
      if (generacionSeleccionada) {
        // Extraer el id de la generación del nombre (generation-i → 1)
        const genId = generacionSeleccionada.split('-').pop();
        const romanToNum = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9 };
        const genNumId = romanToNum[genId] || genId;
        const porGen = await getPokemonsByGeneration(genNumId);
        const nombresGen = new Set(porGen.map((p) => p.name));

        if (pokemonNombres) {
          // Intersección: tipo + generación
          pokemonNombres = new Set(
            [...pokemonNombres].filter((n) => nombresGen.has(n)),
          );
        } else {
          pokemonNombres = nombresGen;
        }
      }

      if (pokemonNombres === null) {
        // Sin filtros de tipo/gen: cargar listado normal
        const lista = await getPokemonList();
        const detalles = await fetchDetallesEnLotes(
          lista.map((p) => p.name),
        );
        setPokemon(detalles);
      } else {
        // Con filtros: cargar detalles de los que pasaron
        const detalles = await fetchDetallesEnLotes([...pokemonNombres]);
        setPokemon(detalles);
      }
    } catch (err) {
      setError('No se pudieron cargar los datos. Intentá de nuevo más tarde.');
    } finally {
      setCargando(false);
    }
  }, [tipoSeleccionado, generacionSeleccionada]);

  useEffect(() => {
    // Solo re-filtrar cuando cambian tipo o generación (no en la carga inicial)
    if (tipoSeleccionado !== '' || generacionSeleccionada !== '') {
      cargarFiltrados();
    }
  }, [tipoSeleccionado, generacionSeleccionada, cargarFiltrados]);

  // Filtrado local por texto de búsqueda
  const pokemonFiltrados = filtrarPorBusqueda(pokemon, textoBusqueda);

  // Paginación
  const totalPaginas = Math.ceil(pokemonFiltrados.length / POKEMON_POR_PAGINA);
  const inicio = (paginaActual - 1) * POKEMON_POR_PAGINA;
  const pokemonPaginados = pokemonFiltrados.slice(inicio, inicio + POKEMON_POR_PAGINA);

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
    setPaginaActual(1);
    if (tipo === '') {
      cargarFiltrados();
    }
  };

  const handleGeneracionChange = (gen) => {
    setGeneracionSeleccionada(gen);
    setPaginaActual(1);
    if (gen === '') {
      cargarFiltrados();
    }
  };

  const handleSearch = (texto) => {
    setTextoBusqueda(texto);
    setPaginaActual(1);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pokédex Argentina</h1>
        <p className="app__subtitle">
          Buscá y filtrá pokémon por tipo, generación o nombre.
        </p>
      </header>

      <main className="app__main">
        <section className="app__filtros">
          <SearchInput onSearch={handleSearch} />
          <TypeSelect tipos={tipos} onChange={handleTipoChange} />
          <GenerationSelect
            generaciones={generaciones}
            onChange={handleGeneracionChange}
          />
        </section>

        <section className="app__contenido">
          {cargando && (
            <div className="app__loading">
              <p>Cargando pokémon...</p>
            </div>
          )}
          {error && (
            <div className="app__error">
              <p>{error}</p>
            </div>
          )}
          {!cargando && !error && (
            <>
              <PokemonList pokemon={pokemonPaginados} />
              <Pagination
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                onCambiarPagina={setPaginaActual}
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
