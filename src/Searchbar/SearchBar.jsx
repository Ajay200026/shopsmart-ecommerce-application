import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("http://localhost:8000/api/products")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.productName &&
            user.productName.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="flex items-center border  border-gray-300 rounded-md w-[320px] h-[30px] bg-orange-200">
      <span className="  flex items-center h-6 w-5">
        <FaSearch className="text-gray-500 ml-0.5 text-center" />
      </span>
      <input
        className="py-2 px-4 focus:outline-none w-[296px] h-[30px] "
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
