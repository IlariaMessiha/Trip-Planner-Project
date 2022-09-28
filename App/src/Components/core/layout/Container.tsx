import { FC, ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}
export const Container: FC<ContainerProps> = ({ className = "", children }) => {
  return <div className={className + " " + styles.container}>{children}</div>;
};
