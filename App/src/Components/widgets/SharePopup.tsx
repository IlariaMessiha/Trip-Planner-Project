import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import { DialogTitle, IconButton, styled } from "@mui/material";
import { Typography } from "../core/Typography";
import styles from "./SharePopup.module.css";
interface SharePopupProps {
    url: string;
    open: boolean;
    onClose: () => void;
}
const ExitButton = styled(IconButton)({
    position: "absolute",
    backgroundColor: "white",
    top: 6,
    right: 10,
    zIndex: 10,
});
export const SharePopup: FC<SharePopupProps> = ({ url, open, onClose }) => {
    return (
        <>
            <Dialog open={open}>
                <ExitButton onClick={() => onClose()}>
                    <CloseIcon />
                </ExitButton>
                <DialogTitle>
                    <Typography text="Share" variant="h3" />
                </DialogTitle>
                <div className={styles.shareOptions}>
                    <FacebookShareButton url={url} onClick={() => onClose()}>
                        <FacebookIcon size={50} round />
                    </FacebookShareButton>
                    <WhatsappShareButton url={url} onClick={() => onClose()}>
                        <WhatsappIcon size={50} round />
                    </WhatsappShareButton>
                    <TwitterShareButton url={url} onClick={() => onClose()}>
                        <TwitterIcon size={50} round />
                    </TwitterShareButton>
                </div>
            </Dialog>
        </>
    );
};
