import { ChangeEventHandler, FC } from "react";
import { FiSearch } from "react-icons/fi";
import { Container } from "./Container";
import styles from "./InputTextSearchPage.module.css";
interface InputTextSearchPageProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  inputValue: string | undefined;
}
export const InputTextSearchPage: FC<InputTextSearchPageProps> = ({
  onChange,
  inputValue,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchIcon}>
        <FiSearch />
      </div>
      <input
        type="search"
        className={styles.searchBar}
        value={inputValue}
        onChange={onChange}
      />
    </div>
  );
};
