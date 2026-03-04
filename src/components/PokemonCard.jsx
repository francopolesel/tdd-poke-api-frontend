// src/components/PokemonCard.jsx
import { capitalizar, formatearNumero } from '../utils/format';

export default function PokemonCard({ pokemon }) {
  const { id, name, types, sprites } = pokemon;
  const tieneImagen = sprites && sprites.front_default;

  return (
    <div className="pokemon-card">
      {tieneImagen ? (
        <img
          src={sprites.front_default}
          alt={capitalizar(name)}
          className="pokemon-card__img"
        />
      ) : (
        <div className="pokemon-card__placeholder">Sin imagen</div>
      )}
      <h3 className="pokemon-card__nombre">{capitalizar(name)}</h3>
      <span className="pokemon-card__id">{formatearNumero(id)}</span>
      <div className="pokemon-card__tipos">
        {types.map((t) => (
          <span key={t.type.name} className="pokemon-card__tipo">
            {capitalizar(t.type.name)}
          </span>
        ))}
      </div>
    </div>
  );
}
