// src/components/PokemonList.jsx
import PokemonCard from './PokemonCard';

export default function PokemonList({ pokemon }) {
  if (!pokemon || pokemon.length === 0) {
    return (
      <p className="pokemon-list__vacio">
        No se encontraron pokémon. Probá con otro filtro, ¡che!
      </p>
    );
  }

  return (
    <div className="pokemon-list">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.id} pokemon={poke} />
      ))}
    </div>
  );
}
