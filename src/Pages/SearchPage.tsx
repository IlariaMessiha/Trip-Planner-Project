import { ChangeEvent, FC, useState } from "react";

import { Container } from "../Components/core/Container";
import { InputTextSearchPage } from "../Components/core/InputTextSearchPage";
import { Typography } from "../Components/core/Typography";
import { Activity } from "../models/Activity";
import { Location } from "../models/Location";
import styles from "./SearchPage.module.css";
import { ApiCalls } from "../api/api";
interface SearchEngineProps {
  location: Location[];
  activity: Activity[];
}
export const SearchPage: FC<SearchEngineProps> = ({ location }) => {
  const [fiteredData, setFilteredData] = useState<Location[]>([]);
  const [wordEntered, setWordEntered] = useState<string>("");
  const handleFilter = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const searchWord: string = target.value.toLowerCase();
    setWordEntered(searchWord);
    const newFilter: Location[] = location.filter((value) => {
      if (
        value.name.toLowerCase().includes(searchWord) ||
        value.continent.toLowerCase().startsWith(searchWord) ||
        value.country.toLowerCase().startsWith(searchWord)
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
    <Container>
      <InputTextSearchPage onChange={handleFilter} inputValue={wordEntered} />
      <div className={styles.searchResult}>
        {fiteredData.map((value) => {
          return (
            <Typography
              key={value.id}
              text={value.name}
              className={styles.searchResultElement}
            />
          );
        })}
      </div>
    </Container>
  );
};
