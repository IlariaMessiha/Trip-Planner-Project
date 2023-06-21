import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    const updateTrip = async () => {
        await onUpdateTrip(label);
        onClose();
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t("user.updateTrip")}</DialogTitle>
            <form onSubmit={e => e.preventDefault()}>
                <DialogContent>
                    <TextField
                        id="outlined-basic"
                        label={t("trip.label")}
                        variant="outlined"
                        fullWidth
                        value={label}
                        onChange={e => {
                            setLabel(e.target.value);
                        }}
                    />
                </DialogContent>

                {loading && <LinearProgress />}

                <DialogActions>
                    <Button onClick={onClose}>{t("common.cancel")}</Button>
                    <Button onClick={updateTrip} autoFocus>
                        {t("common.agree")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
