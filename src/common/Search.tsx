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
    <div className="relative w-full max-w-md"> {/* Wider input container */}
      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-custom-grey text-2xl">
        <IoIosSearch />
      </span>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded-full pl-12 pr-4 py-2 text-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};
