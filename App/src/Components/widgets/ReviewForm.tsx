import { Button, Rating, TextField, Typography, styled } from "@mui/material";
import { FC, useState } from "react";
import { postData } from "../../api/PostData";
import { useAuthContext } from "../../context/authContext";
import styles from "./ReviewForm.module.css";

import { useTranslation } from "react-i18next";
import { ReviewDto } from "../../types/dto/reviews/ReviewDto";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StarsRating = styled(Rating)({
    "&.MuiRating-root": {
        color: "blue",
    },
});
interface ReviewFormProps {
    type: "attractionReview" | "restaurantReview";
    itemId: number;
    onSuccess: (review: ReviewDto) => void;
}

export const ReviewForm: FC<ReviewFormProps> = ({ type, itemId, onSuccess }) => {
    const [rating, setRating] = useState<number | null>(0);
    const [title, setTitle] = useState<string | null>(null);
    const [body, setBody] = useState<string | null>(null);
    const { loggedInUser } = useAuthContext();
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loggedInUser) {
            navigate("/auth/login");
            return;
        }
        if (body && title && rating) {
            try {
                const createdReview = await postData.writeReview({
                    review: {
                        body: body,
                        title: title,
                        rating: rating,
                        user: loggedInUser,
                        itemId: itemId,
                    },
                    type: type,
                });
                onSuccess(createdReview);
                setRating(0);
                setTitle("");
                setBody("");
            } catch (e) {
                toast.error("Try Again", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 4000,
                    hideProgressBar: true,
                });
            }
        } else {
            toast.error("Enter All The Fields", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 4000,
                hideProgressBar: true,
            });
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
