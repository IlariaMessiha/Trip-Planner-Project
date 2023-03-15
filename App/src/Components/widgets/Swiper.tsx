import { ReactNode, useRef } from "react";
import { Navigation, Pagination } from "swiper";
import "./Swiper.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./Swiper.module.css";
import "swiper/css";
import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";

interface SwiperProps<T = any> {
    items: T[];
    renderItem: (item: T) => ReactNode;
}
const SwiperArrowsButton = styled(IconButton)({
    backgroundColor: "black",
    color: "white",

    "&:hover": {
        backgroundColor: "white",
        color: "black",
    },
});

export const Swiper = <T extends any>({ renderItem, items }: SwiperProps<T>) => {
    const nextButton = useRef(null);
    const prevButton = useRef(null);

    return (
        <ReactSwiper
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },

                750: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1090: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                },
                1280: {
                    slidesPerView: 3.5,
                    spaceBetween: 20,
                },
            }}
            modules={[Navigation]}
            navigation={{
                prevEl: prevButton.current,
                nextEl: nextButton.current,
            }}
            pagination={{ clickable: true }}
            centerInsufficientSlides={true}
        >
            {items.map((item, i) => {
                return <SwiperSlide key={i}>{renderItem(item)}</SwiperSlide>;
            })}

            <div className={styles.prevButton} ref={prevButton}>
                <SwiperArrowsButton>
                    <ArrowBackIcon />
                </SwiperArrowsButton>
            </div>
            <div className={styles.nextButton} ref={nextButton}>
                <SwiperArrowsButton>
                    <ArrowForwardIcon />
                </SwiperArrowsButton>
            </div>
        </ReactSwiper>
    );
};
