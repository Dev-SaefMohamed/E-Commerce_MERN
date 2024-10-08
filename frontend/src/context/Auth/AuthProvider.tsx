import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));


    const login = (username: string, token: string) => {
        setUsername(username);
        setToken(token);
                    //  take only key -> string
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
    }

    return (
        <AuthContext.Provider value={{ username, token, login }}>
             {/* children here mean all app wrap in [AUTHprovider]*/}
              {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;