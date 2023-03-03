import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ImageList,
    ImageListItem,
    styled,
} from "@mui/material";
import { FC, useState } from "react";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { Typography } from "../core/Typography";
import styles from "./LocationGallery.module.css";

import { useTranslation } from "react-i18next";

interface LocationGalleryProps {
    location: Location;
}
function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
}
const StyledButton = styled(Button)({
    backgroundColor: "black",
    borderRadius: 20,
    position: "absolute",
    bottom: 10,
    color: "white",
    margin: "10px",
    "&:hover": {
        backgroundColor: "white",
        color: "black",
    },
});
const StyledImageListItem = styled(ImageListItem)({
    "> .MuiImageListItem-img": {
        height: "100%",
    },
});

export const LocationGallery: FC<LocationGalleryProps> = ({ location }) => {
    return <div></div>;
    // const { t } = useTranslation();
    // const [open, setOpen] = useState(false);
    // const handleClickOpen = () => {
    //   setOpen(true);
    // };

    // const handleClose = () => {
    //   setOpen(false);
    // };
    // const galleryItem = [
    //   {
    //     img: location.photos[0],
    //     cols: 2,
    //     rows: 2,
    //   },
    //   {
    //     img: location.photos[1],
    //     cols: 2,
    //     rows: 1,
    //   },
    //   {
    //     img: location.photos[2],
    //     cols: 2,
    //     rows: 1,
    //   },
    // ];
    // return (
    //   <div className={styles.wrapper}>
    //     <ImageList
    //       sx={{ width: "100%" }}
    //       variant="quilted"
    //       cols={4}
    //       rowHeight={200}
    //     >
    //       {galleryItem.map((photo, i) => {
    //         return (
    //           <ImageListItem key={i} cols={photo.cols} rows={photo.rows}>
    //             <img
    //               {...srcset(photo.img, 200, photo.rows, photo.cols)}
    //               alt="location"
    //               loading="lazy"
    //             />
    //           </ImageListItem>
    //         );
    //       })}
    //     </ImageList>

    //     <StyledButton
    //       variant="contained"
    //       startIcon={<PhotoSizeSelectActualIcon />}
    //       onClick={handleClickOpen}
    //     >
    //       <Typography
    //         text={t("Locations.locationPage.seeAllPhotos")}
    //         variant="body2"
    //       />
    //     </StyledButton>
    //     <Dialog
    //       open={open}
    //       onClose={handleClose}
    //       aria-labelledby="alert-dialog-title"
    //       aria-describedby="alert-dialog-description"
    //       maxWidth="xl"
    //     >
    //       <DialogTitle id="alert-dialog-title">
    //         {t("Locations.locationPage.photosOf")} {location.name}
    //       </DialogTitle>
    //       <DialogContent>
    //         <ImageList sx={{ width: "100%" }} rowHeight={400} cols={3}>
    //           {location.photos.map((photo, i) => (
    //             <StyledImageListItem key={i} cols={1} rows={1}>
    //               <img
    //                 src={`${photo}?w=164&h=164&fit=crop&auto=format`}
    //                 srcSet={`${photo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
    //                 alt="location"
    //                 loading="lazy"
    //               />
    //             </StyledImageListItem>
    //           ))}
    //         </ImageList>
    //       </DialogContent>
    //       <DialogActions>
    //         <StyledButton onClick={handleClose}>{t("common.close")}</StyledButton>
    //       </DialogActions>
    //     </Dialog>
    //   </div>
    // );
};
