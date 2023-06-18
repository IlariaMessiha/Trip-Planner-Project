import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { FC, useState } from "react";
import styles from "./TripUpdateDialogue.module.css";
import { postData } from "../../../api/PostData";

export interface TripUpdateDialogueProps {
    open: boolean;
    tripId: number;
}
export const TripUpdateDialogue: FC<TripUpdateDialogueProps> = ({ open, tripId }) => {
    const [label, setLabel] = useState<string>("");
    const updateTrip = (e: React.FormEvent) => {
        postData.updateTrip({
            tripId,
            tripLabel: label,
        });
    };
    return (
        <Dialog open={open}>
            <DialogTitle>Update Your Trip</DialogTitle>
            <form className={styles.form} onSubmit={updateTrip}>
                <TextField
                    id="outlined-basic"
                    label="Trip Label"
                    variant="outlined"
                    fullWidth
                    onChange={e => {
                        setLabel(e.target.value);
                    }}
                />
                <Button variant="contained" sx={{ marginTop: "20px" }} type="submit">
                    Update
                </Button>
            </form>
        </Dialog>
    );
};
