// src/components/GenerationSelect.jsx
import { capitalizar } from '../utils/format';

export default function GenerationSelect({ generaciones, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="generation-select">
      <label htmlFor="generacion-select">Generación</label>
      <select id="generacion-select" onChange={handleChange} defaultValue="">
        <option value="">Todas</option>
        {generaciones &&
          generaciones.map((gen) => (
            <option key={gen.name} value={gen.name}>
              {capitalizar(gen.name)}
            </option>
          ))}
      </select>
    </div>
  );
}
