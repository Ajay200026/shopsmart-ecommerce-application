import React from "react";

const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  minPrice,
  setMinPrice,
}) => {
  return (
    <div className="flex justify-end mb-4 fixed ml-[50rem] z-50">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded mr-2"
      />
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="p-2 border border-gray-300 rounded mr-2"
      >
        <option value="asc">Price Low to High</option>
        <option value="desc">Price High to Low</option>
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(parseInt(e.target.value))}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default ProductFilters;
