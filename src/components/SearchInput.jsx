export default function SearchInput({ onSearch }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-input">
      <input
        type="text"
        placeholder="Buscar por nombre o tipo..."
        onChange={handleChange}
        className="search-input__field"
      />
    </div>
  );
}
