import { createContext, useContext } from "react";
import { UserDto } from "../types/dto/common/UserDto";

export interface AuthContextValue {
    loggedInUser: UserDto | null;
    isFetchingUser: boolean;
    setUserInContext: (user: UserDto | null) => void;
}

export const AuthContext = createContext<AuthContextValue>({
    loggedInUser: null,
    isFetchingUser: false,
    setUserInContext: (user: UserDto | null) => {},
});

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
};
