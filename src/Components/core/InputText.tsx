import { ChangeEventHandler, FC } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./InputText.module.css";
interface InputTextProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  inputValue: string;
}
export const InputText: FC<InputTextProps> = ({ onChange, inputValue }) => {
  return (
    <div className={styles.container}>
      <div className={styles.searchIcon}>
        <FaSearch />
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
