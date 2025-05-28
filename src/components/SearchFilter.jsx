// src/components/SearchFilter.jsx
const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search profiles by name..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
    />
  );
};

export default SearchFilter;
