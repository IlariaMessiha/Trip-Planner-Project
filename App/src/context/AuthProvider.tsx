import { FC, ReactNode, useEffect, useState } from "react";
import { UserDto } from "../types/dto/common/UserDto";
import { AuthContext } from "./authContext";

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
    }, []);

    return (
        <AuthContext.Provider value={{ loggedInUser: user, setUserInContext: setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
