import { FC, ReactNode } from "react";
import "swiper/css";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";

interface SwiperProps<T = any> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

export const Swiper = <T extends any>({
  renderItem,
  items,
}: SwiperProps<T>) => {
  return (
    <ReactSwiper spaceBetween={50} slidesPerView={3}>
      {items.map((item) => {
        return <SwiperSlide>{renderItem(item)}</SwiperSlide>;
      })}
    </ReactSwiper>
  );
};
