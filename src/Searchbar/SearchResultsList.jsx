import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, setShowResults }) => {
  return (
    <div className="results-list absolute top-10 w-[500px] bg-white shadow-md rounded-md z-10 mt-[2rem]">
      {results.length > 0 ? (
        results.map((result, id) => (
          <SearchResult
            result={result.productName}
            key={id}
            setShowResults={setShowResults}
          />
        ))
      ) : (
        <div className="px-4 py-2">No results found.</div>
      )}
    </div>
  );
};
