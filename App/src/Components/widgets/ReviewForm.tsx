import { Button, Rating, TextField, Typography, styled } from "@mui/material";
import { FC, useState } from "react";
import { postData } from "../../api/PostData";
import { useAuthContext } from "../../context/authContext";
import styles from "./ReviewForm.module.css";

import { useTranslation } from "react-i18next";

const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
interface ReviewFormProps {
    type: "attractionReview" | "restaurantReview";
    itemId: number;
}

export const ReviewForm: FC<ReviewFormProps> = ({ type, itemId }) => {
    const [rating, setRating] = useState<number | null>(0);
    const [title, setTitle] = useState<string | null>(null);
    const [body, setBody] = useState<string | null>(null);
    const { loggedInUser } = useAuthContext();
    const token = localStorage.getItem("accessToken");
    const handleSubmit = async (e: React.FormEvent) => {
        if (body && title && rating && loggedInUser && token) {
            await postData.writeReview(
                {
                    review: {
                        body: body,
                        title: title,
                        rating: rating,
                        user: loggedInUser,
                        id: NaN,
                        itemId: itemId,
                    },
                    type: type,
                },
                token
            );
        } else if (!loggedInUser) {
        }
    };
    const { t } = useTranslation();
    return (
        <form className={styles.reviewForm} onSubmit={handleSubmit}>
            <TextField
                id="standard-basic"
                label={t("reviews.title")}
                variant="standard"
                fullWidth
                sx={{ padding: "10px", marginBottom: "20px" }}
                onChange={({ target }) => {
                    setTitle(target.value);
                }}
            />
            <TextField
                id="standard-multiline-static"
                label={t("reviews.body")}
                multiline
                rows={4}
                variant="standard"
                fullWidth
                sx={{ padding: "10px", marginBottom: "20px" }}
                onChange={({ target }) => {
                    setBody(target.value);
                }}
            />
            <Typography component="legend" variant="subtitle2">
                {t("reviews.rate")}
            </Typography>
            <StarsRating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
                sx={{ padding: "10px", marginBottom: "20px" }}
            />

            <Button variant="text" sx={{ float: "right" }} type="submit">
                {t("reviews.submit")}
            </Button>
        </form>
    );
};
