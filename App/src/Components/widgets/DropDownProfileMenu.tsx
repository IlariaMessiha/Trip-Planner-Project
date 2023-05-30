import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import styles from "./DropDownProfile.module.css";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Fade, Typography } from "@mui/material";
import AuthService from "../../services/auth.service";
import Link from "@mui/material/Link";
import { useAuthContext } from "../../context/authContext";

type User = {
    isAuthenticated: boolean;
};

export const DropDownProfileMenu = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { loggedInUser, setUserInContext } = useAuthContext();
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    function handleClick(event: React.MouseEvent<HTMLElement>) {
        setAnchorEl(event.currentTarget);
        console.log(loggedInUser);
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
                {!loggedInUser ? (
                    <Avatar sx={{ width: 32, height: 32 }}>
                        <PersonIcon className={styles.profileIcon} />
                    </Avatar>
                ) : (
                    <Avatar sx={{ width: 32, height: 32 }}>
                        {loggedInUser.firstName.charAt(0)}
                    </Avatar>
                )}
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
            >
                {loggedInUser ? (
                    <div>
                        <MenuItem
                            onClick={() => {
                                navigate("/profile");
                            }}
                        >
                            Profile
                        </MenuItem>

                        <MenuItem
                            onClick={() => {
                                props.handleLogout();
                                navigate("/auth/login");
                            }}
                        >
                            Logout
                        </MenuItem>
                    </div>
                ) : (
                    <div>
                        <MenuItem
                            onClick={() => {
                                navigate("/auth/login");
                            }}
                        >
                            Login
                        </MenuItem>
                        <MenuItem
                            onClick={() => {
                                navigate("/auth/register");
                            }}
                        >
                            Register
                        </MenuItem>
                    </div>
                )}
            </Menu>
        </div>
    );
};
