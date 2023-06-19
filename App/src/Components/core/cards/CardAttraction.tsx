import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    IconButton,
    Rating,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";
import styles from "./CardAttraction.module.css";
import { Link, useNavigate } from "react-router-dom";
import { postData } from "../../../api/PostData";
import { useAuthContext } from "../../../context/authContext";
import { AttractionDto } from "../../../types/dto/common/AttractionDto";
import PlaceholderImage from "../../../assets/images/placeholder.png";

interface CardAttractionProps {
    attraction: AttractionDto;
    liked: boolean;
}
const FavoriteButton = styled(IconButton)(() => ({
    position: "absolute",
    backgroundColor: "white",
    color: "black",
    top: 6,
    right: 10,
    zIndex: 10,
    // Additional styles for the icon
    // "& .MuiSvgIcon-root": {
    //     fill: "black",
    // },
}));

const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
export const CardAttraction: FC<CardAttractionProps> = ({ attraction, liked }) => {
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();
    const [likedLoc, setLikedLoc] = useState<boolean>(liked);

    const like = (attraction: AttractionDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.like(
                {
                    item: attraction,
                    type: "attraction",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(true);
        } else {
            navigate("/auth/login");
        }
    };

    const dislike = (attraction: AttractionDto) => {
        const token = localStorage.getItem("accessToken");
        if (loggedInUser && token) {
            postData.dislike(
                {
                    item: attraction,
                    type: "attraction",
                    userId: loggedInUser.id,
                },
                token
            );
            setLikedLoc(false);
        } else {
            navigate("/auth/login");
        }
    };

    useEffect(() => {
        setLikedLoc(liked);
    }, [liked]);

    return (
        <div className={styles.container}>
            <Card className={styles.item} sx={{ width: 280 }}>
                <FavoriteButton
                    onClick={() => {
                        if (likedLoc) {
                            dislike(attraction);
                            console.log("dislike");
                        } else {
                            like(attraction);
                            console.log("like");
                        }
                    }}
                >
                    {likedLoc ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
                </FavoriteButton>

                <Link key={attraction.id} to={`/attraction/${attraction.id}`}>
                    <CardActionArea sx={{ ":hover": { opacity: 0.9 } }}>
                        {attraction.imageUrl ? (
                            <CardMedia
                                component="img"
                                height="200"
                                image={attraction.imageUrl}
                                alt={attraction.label}
                            />
                        ) : (
                            <CardMedia
                                component="img"
                                height="200"
                                loading="lazy"
                                image={PlaceholderImage}
                                alt={attraction.label}
                            />
                        )}

                        <CardContent className={styles.AttractionContent}>
                            <Typography variant="body1" className={styles.label}>
                                {attraction.label}
                            </Typography>

                            {attraction.rating && (
                                <StarsRating
                                    name="half-rating"
                                    defaultValue={attraction.rating}
                                    precision={0.5}
                                    readOnly
                                    sx={{}}
                                />
                            )}
                            {attraction.type && (
                                <Typography variant="body2">
                                    {attraction.type} attraction
                                </Typography>
                            )}
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    );
};
