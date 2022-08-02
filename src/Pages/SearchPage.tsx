import { ChangeEvent, FC, useState } from "react";

import { Container } from "../Components/core/Container";
import { SearchEngine } from "../Components/widgets/SearchEngine";
import styles from "./SearchPage.module.css";

export const SearchPage = () => {
  return <SearchEngine />;
};
