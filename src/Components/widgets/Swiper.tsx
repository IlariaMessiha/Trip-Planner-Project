import { FC, ReactNode } from "react";
import { Container } from "../core/Container";
import styles from "./Swiper.module.css";
interface SwiperProps {
  children: ReactNode;
}
export const Swiper: FC<SwiperProps> = ({ children }) => {
  return <div className={styles.items}>{children}</div>;
};
