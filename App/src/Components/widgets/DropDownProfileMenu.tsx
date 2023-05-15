import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import styles from "./DropDownProfile.module.css";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Fade } from "@mui/material";

type User = {
    isAuthenticated: boolean;
};

export const DropDownProfileMenu = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [user, setUser] = useState<User>({ isAuthenticated: false });
    const open = Boolean(anchorEl);

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    useEffect(() => {
        function handleOutsideClick(event: any) {
            if (anchorEl && !anchorEl.contains(event.target)) {
                handleClose();
            }
        }

        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, [anchorEl]);

    return (
        <div>
            <IconButton onClick={handleClick}>
                <PersonIcon className={styles.profileIcon} />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "fade-button",
                }}
                sx={{ width: 200 }}
                hideBackdrop

                // open={open}
            >
                {props.isAuthenticated ? (
                    <div>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </div>
                ) : (
                    <div>
                        <MenuItem>Sign In</MenuItem>
                        <MenuItem>Register</MenuItem>
                    </div>
                )}
            </Menu>
        </div>
    );
};
