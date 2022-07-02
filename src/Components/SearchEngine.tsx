import { ChangeEvent, FC, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Location } from "../models/Location";
import "./SearchEngine.css";
export const SearchEngine: FC<{ data: Location[] }> = ({ data }) => {
  const [fiteredData, setFilteredData] = useState<Location[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");
  const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);
    const newFilter: Location[] = data.filter((value) => {
      if (
        value.name.toLowerCase().includes(searchWord) ||
        value.continent.toLowerCase().includes(searchWord) ||
        value.country.toLowerCase().includes(searchWord)
      ) {
        return value;
      }
    });
    // console.log(searchWord);

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    console.log(newFilter);
  };

  return (
    <div className="search">
      <div className="search-container">
        <div className="search-icon">
          <FaSearch />
        </div>
        <input
          type="search"
          className="search-bar"
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
      <div className="search-result">
        {fiteredData.map((value, key) => {
          return (
            <div key={key} className="result-element">
              {value.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
