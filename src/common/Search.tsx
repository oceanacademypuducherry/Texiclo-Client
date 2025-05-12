import { IoIosSearch } from "react-icons/io";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchTerm.trim().toLowerCase());
    }, 300); 

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-full px-4 py-1 focus:outline-none text-xl"
      />
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-custom-grey">
        <IoIosSearch />
      </span>
    </div>
  );
};
