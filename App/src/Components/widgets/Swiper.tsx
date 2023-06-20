import { ReactNode } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import styles from "./Swiper.module.css";

interface SwiperProps<T = any> {
    items: T[];
    renderItem: (item: T) => ReactNode;
}

export const Swiper = <T extends any>({ renderItem, items }: SwiperProps<T>) => {
    return (
        <ReactSwiper
            className={styles.swiper}
            breakpoints={{
                0: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                },
                450: {
                    slidesPerView: 1.6,
                    spaceBetween: 10,
                },
                550: {
                    slidesPerView: 2.2,
                    spaceBetween: 10,
                },
                700: {
                    slidesPerView: 2.6,
                    spaceBetween: 10,
                },

                800: {
                    slidesPerView: 3.2,
                    spaceBetween: 10,
                },
                1050: {
                    slidesPerView: 4.2,
                    spaceBetween: 10,
                },
            }}
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            centerInsufficientSlides={true}
        >
            {items.map((item, i) => {
                return <SwiperSlide key={i}>{renderItem(item)}</SwiperSlide>;
            })}
        </ReactSwiper>
    );
};
