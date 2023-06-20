import { CardContent, Chip, Rating, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../../api/PostData";
import { useAuthContext } from "../../../context/authContext";
import { AttractionDto } from "../../../types/dto/common/AttractionDto";
import { CardBase } from "./CardBase";

interface CardAttractionProps {
    attraction: AttractionDto;
    liked: boolean;
}

const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
export const CardAttraction: FC<CardAttractionProps> = ({ attraction, liked }) => {
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState<boolean>(liked);

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
            setIsFavorite(true);
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
            setIsFavorite(false);
        } else {
            navigate("/auth/login");
        }
    };

    useEffect(() => {
        setIsFavorite(liked);
    }, [liked]);

    return (
        <CardBase
            isFavoriteEnabled={true}
            isFavorite={isFavorite}
            navigateTo={`/attraction/${attraction.id}`}
            imageAlt={attraction.label}
            imageUrl={attraction.imageUrl}
            onFavoriteClick={() => {
                if (isFavorite) {
                    dislike(attraction);
                } else {
                    like(attraction);
                }
            }}
        >
            <CardContent>
                <Typography variant="body1">{attraction.label}</Typography>
                <div>
                    {attraction.rating && (
                        <StarsRating
                            size="small"
                            name="half-rating"
                            defaultValue={attraction.rating}
                            precision={0.5}
                            readOnly
                        />
                    )}
                </div>
                {attraction.type && (
                    <span style={{ paddingTop: 4 }}>
                        <Chip variant="outlined" size="small" label={attraction.type} />
                    </span>
                )}
            </CardContent>
        </CardBase>
    );
};
