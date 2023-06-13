import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import styles from "./DropDownProfile.module.css";

export const DropDownProfileMenu = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { loggedInUser } = useAuthContext();
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
                <Avatar sx={{ width: 32, height: 32 }}>
                    <PersonIcon className={styles.profileIcon} />
                </Avatar>
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
                {loggedInUser && (
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
                )}
            </Menu>
        </div>
    );
};
