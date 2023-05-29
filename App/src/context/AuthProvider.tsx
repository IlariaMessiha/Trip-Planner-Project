import { FC, ReactNode, useEffect, useState } from "react";
import { UserDto } from "../types/dto/common/UserDto";
import { AuthContext } from "./authContext";
import { fetchData } from "../api/FetchData";

interface AuthProviderProps {
    /**
     *  Must have children
     */
    children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserDto | null>(null);

    useEffect(() => {
        // TODO Try to fetch /api/user/me
        const onMount = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                const _user = await fetchData.getMe(token);
                setUser(_user);
            } else {
                setUser(null);
            }
        };
        onMount();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedInUser: user, setUserInContext: setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
