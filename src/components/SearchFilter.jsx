const SearchFilter = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by name or city..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;