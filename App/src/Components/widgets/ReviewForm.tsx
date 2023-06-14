import { Button, Rating, TextField, Typography, styled } from "@mui/material";
import styles from "./ReviewForm.module.css";
import { FC, useState } from "react";
import { postData } from "../../api/PostData";
import { useAuthContext } from "../../context/authContext";

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
    const handleSubmit = (e: React.FormEvent) => {
        if (rating && title && body && loggedInUser && token)
            postData.writeReview(
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
    };

    return (
        <form className={styles.reviewForm} onSubmit={handleSubmit}>
            <TextField
                id="standard-basic"
                label="Review Title"
                variant="standard"
                fullWidth
                sx={{ padding: "10px", marginBottom: "20px" }}
                onChange={({ target }) => {
                    setTitle(target.value);
                }}
            />
            <TextField
                id="standard-multiline-static"
                label="Review Body"
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
                Rate your experience
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
                SUBMIT
            </Button>
        </form>
    );
};
