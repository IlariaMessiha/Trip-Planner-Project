import { FC, ReactNode } from "react";
import { Typography } from "../Typography";
import styles from "./Section.module.css";

interface SectionProps {
  title: string;
  children: ReactNode;
}

export const Section: FC<SectionProps> = ({ title, children }) => (
  <div className={styles.section}>
    <Typography text={title} variant="h2" />
    {children}
  </div>
);
