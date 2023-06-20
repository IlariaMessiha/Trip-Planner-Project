import { ReactNode } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as ReactSwiper, SwiperProps as ReactSwiperProps, SwiperSlide } from "swiper/react";
import styles from "./Swiper.module.css";

interface SwiperProps<T = any> {
    items: T[];
    renderItem: (item: T) => ReactNode;
}

const DEFAULT_BREAKPOINTS: ReactSwiperProps["breakpoints"] = {
    0: {
        slidesPerView: 1.2,
    },
    450: {
        slidesPerView: 1.6,
    },
    550: {
        slidesPerView: 2.2,
    },
    700: {
        slidesPerView: 2.6,
    },
    800: {
        slidesPerView: 3.2,
    },
    1050: {
        slidesPerView: 4.2,
    },
};

export const Swiper = <T extends any>({ renderItem, items }: SwiperProps<T>) => {
    return (
        <ReactSwiper
            spaceBetween={10}
            breakpointsBase="container"
            className={styles.swiper}
            breakpoints={DEFAULT_BREAKPOINTS}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
        >
            {items.map((item, i) => {
                return <SwiperSlide key={i}>{renderItem(item)}</SwiperSlide>;
            })}
        </ReactSwiper>
    );
};
