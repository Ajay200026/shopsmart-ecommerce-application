import React, { useState } from "react";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchFilteredResults = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/products/search?searchTerm=${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error("Failed to fetch search results:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (value.length > 2) {
      fetchFilteredResults(value);
    } else {
      // Clear search results if search term is less than 3 characters
      setSearchResults([]);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
      <ul>
        {searchResults.map((result) => (
          <li key={result.productName}>{result.productName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;
