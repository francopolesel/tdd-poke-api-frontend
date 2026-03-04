import { capitalizar } from '../utils/format';

export default function TypeSelect({ tipos, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="type-select">
      <label htmlFor="tipo-select">Tipo</label>
      <select id="tipo-select" onChange={handleChange} defaultValue="">
        <option value="">Todos</option>
        {tipos &&
          tipos.map((tipo) => (
            <option key={tipo.name} value={tipo.name}>
              {capitalizar(tipo.name)}
            </option>
          ))}
      </select>
    </div>
  );
}
