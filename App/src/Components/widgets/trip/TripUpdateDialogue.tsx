import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    TextField,
} from "@mui/material";
import { FC, useState } from "react";

export interface TripUpdateDialogueProps {
    open: boolean;
    tripLabel: string;
    loading: boolean;
    onUpdateTrip: (label: string) => Promise<void>;
    onClose: () => void;
}
export const TripUpdateDialogue: FC<TripUpdateDialogueProps> = ({
    open,
    loading,
    tripLabel,
    onUpdateTrip,
    onClose,
}) => {
    const [label, setLabel] = useState<string>(tripLabel);

    const updateTrip = async () => {
        await onUpdateTrip(label);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Your Trip</DialogTitle>
            <form onSubmit={e => e.preventDefault()}>
                <DialogContent>
                    <TextField
                        id="outlined-basic"
                        label="Trip Label"
                        variant="outlined"
                        fullWidth
                        value={label}
                        onChange={e => {
                            setLabel(e.target.value);
                        }}
                    />
                </DialogContent>
                <DialogContent dividers>
                    <DialogContentText>
                        You can update your trip label to match your preferences.
                        {/* TODO put the next description instead if you implemented (update start date) or update duration */}
                        {/* If you update the start date or duration, all the items will be updated
                        accordingly. */}
                    </DialogContentText>
                </DialogContent>
                {loading && <LinearProgress />}

                <DialogActions>
                    <Button onClick={onClose}>cancel</Button>
                    <Button onClick={updateTrip} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
