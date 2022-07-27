import { ChangeEvent, FC, useState } from "react";

import { Container } from "../Components/core/Container";
import { SearchEngine } from "../Components/widgets/SearchEngine";

export const SearchPage = () => {
  return (
    <Container>
      <SearchEngine />
    </Container>
  );
};
