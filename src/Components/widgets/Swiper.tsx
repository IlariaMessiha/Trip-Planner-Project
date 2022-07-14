import { FC, ReactNode } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Swiper.module.css";
import Carousel from "react-material-ui-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
interface SwiperProps {
  children: ReactNode;
}

export const Swiper: FC<SwiperProps> = ({ children }) => {
  const [index, setIndex] = React.useState(0);

  // const handleChange = (cur: number | undefined, prev: number | undefined) => {
  //   if (cur !== undefined && prev !== undefined) {
  //     setIndex(cur);
  //     console.log(cur, prev);
  //   }
  // };
  return (
    <Carousel>
      <div className={styles.items}>{children}</div>
    </Carousel>
  );
};
