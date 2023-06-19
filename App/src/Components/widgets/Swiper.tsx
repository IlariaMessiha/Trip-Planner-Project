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
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                400: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                },

                800: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                },
                900: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
                1280: {
                    slidesPerView: 4,
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
