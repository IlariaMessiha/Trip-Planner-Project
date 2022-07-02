import { FaSearch } from "react-icons/fa";
import "./SearchEngine.css";
export const SearchEngine = () => {
  return (
    <div className="search-container">
      <div className="search-icon">
        <FaSearch />
      </div>
      <input type="search" className="search-bar" />
    </div>
  );
};
