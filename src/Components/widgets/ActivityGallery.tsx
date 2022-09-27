import { FC, useRef } from "react";
import { Navigation, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./ActivityGallery.module.css";
import "swiper/css";

import { Swiper as ReactSwiper, SwiperSlide } from "swiper/react";
import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Activity } from "../../models/Activity";
interface ActivityGalleryProps {
  activity: Activity;
  className?: string;
}
const SwiperArrowsButton = styled(IconButton)({
  backgroundColor: "black",
  color: "white",

  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
});
export const ActivityGallery: FC<ActivityGalleryProps> = ({
  activity,
  className,
}) => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const slides = activity.gallery;

  return (
    <ReactSwiper
      className={className}
      modules={[Navigation, Pagination]}
      navigation={{
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }}
      pagination={{ clickable: true }}
      loop={true}
    >
      {slides?.map((slide, i) => {
        return (
          <SwiperSlide key={i}>
            <img src={slide} className={styles.slideImage} alt="activity" />
          </SwiperSlide>
        );
      })}
      <div className={styles.prevButton} ref={prevRef}>
        <SwiperArrowsButton>
          <ArrowBackIcon />
        </SwiperArrowsButton>
      </div>
      <div className={styles.nextButton} ref={nextRef}>
        <SwiperArrowsButton>
          <ArrowForwardIcon />
        </SwiperArrowsButton>
      </div>
    </ReactSwiper>
  );
};
