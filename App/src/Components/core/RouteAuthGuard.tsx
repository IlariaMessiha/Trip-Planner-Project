import { FC } from "react";
import { useAuthContext } from "../../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

interface RouteAuthGuardProps {
    access: "anonymous" | "private";
}

export const RouteAuthGuard: FC<RouteAuthGuardProps> = ({ access }) => {
    const { loggedInUser, isFetchingUser } = useAuthContext();

    if (isFetchingUser) {
        return <Outlet />;
    }

    if (access === "anonymous" && loggedInUser) {
        return <Navigate to={"/"} replace />;
    }

    if (access === "private" && !loggedInUser) {
        return <Navigate to={"/auth/login"} replace />;
    }

    return <Outlet />;
};
