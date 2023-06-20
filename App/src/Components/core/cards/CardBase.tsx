import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Card, CardActionArea, CardMedia, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import PlaceholderImage from "../../../assets/images/placeholder.png";
import styles from "./CardBase.module.css";

interface CardBaseProps {
    imageUrl: string | null;
    imageAlt?: string;
    isFavoriteEnabled?: boolean;
    isFavorite?: boolean;
    navigateTo: string;
    children?: ReactNode;
    onFavoriteClick?: () => void;
}
const FavoriteButton = styled(IconButton)(() => ({
    position: "absolute",
    backgroundColor: "white",
    color: "black",
    top: 6,
    right: 10,
    zIndex: 10,
}));

export const CardBase: FC<CardBaseProps> = ({
    imageUrl,
    imageAlt,
    isFavoriteEnabled,
    isFavorite,
    navigateTo,
    children,
    onFavoriteClick,
}) => {
    return (
        <Card className={styles.card}>
            {isFavoriteEnabled && (
                <FavoriteButton onClick={onFavoriteClick}>
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                </FavoriteButton>
            )}

            <Link to={navigateTo}>
                <CardActionArea sx={{ ":hover": { opacity: 0.9 } }}>
                    {imageUrl ? (
                        <CardMedia component="img" height="200" image={imageUrl} alt={imageAlt} />
                    ) : (
                        <CardMedia
                            component="img"
                            height="200"
                            loading="lazy"
                            image={PlaceholderImage}
                            alt={imageAlt}
                        />
                    )}

                    {children}
                </CardActionArea>
            </Link>
        </Card>
    );
};
