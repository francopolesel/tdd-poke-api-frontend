// src/components/App.jsx
import { useState, useEffect, useCallback } from 'react';
import '../styles/App.css';
import {
  getTypes,
  getGenerations,
  getPokemonList,
  getPokemonDetail,
  getPokemonsByType,
  getPokemonsByGeneration,
} from '../api/pokeApi';
import { filtrarPorBusqueda } from '../utils/filter';
import TypeSelect from './TypeSelect';
import GenerationSelect from './GenerationSelect';
import SearchInput from './SearchInput';
import PokemonList from './PokemonList';

export default function App() {
  const [tipos, setTipos] = useState([]);
  const [generaciones, setGeneraciones] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState('');
  const [generacionSeleccionada, setGeneracionSeleccionada] = useState('');
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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

        // Obtener detalles de cada pokémon
        const detalles = await Promise.all(
          pokemonListData.map((p) => getPokemonDetail(p.name)),
        );

        setPokemon(detalles);
      } catch (err) {
        setError('¡Algo salió mal! No pudimos cargar los pokémon. Intentá de nuevo más tarde, che.');
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
        const detalles = await Promise.all(
          lista.map((p) => getPokemonDetail(p.name)),
        );
        setPokemon(detalles);
      } else {
        // Con filtros: cargar detalles de los que pasaron
        const nombres = [...pokemonNombres];
        const detalles = await Promise.all(
          nombres.map((name) => getPokemonDetail(name)),
        );
        setPokemon(detalles);
      }
    } catch (err) {
      setError('¡Algo salió mal! No pudimos cargar los pokémon. Intentá de nuevo más tarde, che.');
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

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
    if (tipo === '') {
      // Resetear: volver a cargar todo
      cargarFiltrados();
    }
  };

  const handleGeneracionChange = (gen) => {
    setGeneracionSeleccionada(gen);
    if (gen === '') {
      cargarFiltrados();
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Pokédex Argentina</h1>
        <p className="app__subtitle">
          ¡Bienvenido a la pokédex más copada! Buscá y filtrá tus pokémon favoritos.
        </p>
      </header>

      <main className="app__main">
        <section className="app__filtros">
          <SearchInput onSearch={setTextoBusqueda} />
          <TypeSelect tipos={tipos} onChange={handleTipoChange} />
          <GenerationSelect
            generaciones={generaciones}
            onChange={handleGeneracionChange}
          />
        </section>

        <section className="app__contenido">
          {cargando && (
            <div className="app__loading">
              <p>Cargando pokémon... ¡Ya llegan!</p>
            </div>
          )}
          {error && (
            <div className="app__error">
              <p>{error}</p>
            </div>
          )}
          {!cargando && !error && (
            <PokemonList pokemon={pokemonFiltrados} />
          )}
        </section>
      </main>
    </div>
  );
}
