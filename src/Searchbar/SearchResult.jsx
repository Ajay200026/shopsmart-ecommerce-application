export const SearchResult = ({ result, setShowResults }) => {
  const handleClick = (result) => {
    alert(`You selected ${result}!`);
    setShowResults(false);
  };

  return (
    <div
      className="search-result cursor-pointer px-4 py-2 hover:bg-gray-100 "
      onClick={() => handleClick(result)}
    >
      {result}
    </div>
  );
};
