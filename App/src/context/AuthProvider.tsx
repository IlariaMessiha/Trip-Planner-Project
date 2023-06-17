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
    const [isFetchingUser, setIsFetchingUser] = useState(true);

    useEffect(() => {
        const onMount = async () => {
            try {
                setIsFetchingUser(true);
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const _user = await fetchData.getMe(token);
                    setUser(_user);
                } else {
                    setUser(null);
                }
            } finally {
                setIsFetchingUser(false);
            }
        };
        onMount();
    }, []);

    return (
        <AuthContext.Provider
            value={{ loggedInUser: user, setUserInContext: setUser, isFetchingUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
