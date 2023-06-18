import { Dialog, DialogTitle } from "@mui/material";
import { FC } from "react";
import styles from "./TripUpdateDialogue.module.css";

export interface TripAddItemDialogueProps {
    open: boolean;
    tripId: number;
    onClose: () => void;
}
export const TripAddItemDialogue: FC<TripAddItemDialogueProps> = ({ open, tripId, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add a trip item</DialogTitle>
            <form className={styles.form}></form>
        </Dialog>
    );
};
