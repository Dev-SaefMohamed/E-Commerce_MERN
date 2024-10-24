import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "../../constants/baseUrl";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

    const [username, setUsername] = useState<string | null>(localStorage.getItem(USERNAME_KEY));
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));


    const [myOrders, setMyOrders] = useState([]);

      // (!!) -> truth ((*) there is value inside this token)
      const isAuthenticated = !!token;

    const login = (username: string, token: string) => {
        setUsername(username);
        setToken(token);
                    //  take only key -> string
        localStorage.setItem(USERNAME_KEY, username);
        localStorage.setItem(TOKEN_KEY, token);
    }
  
    const logout = () => {
        localStorage.removeItem(USERNAME_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setUsername(null);
        setToken(null);
    }

    const getMyOrders = async () => {
        const response = await fetch(`${BASE_URL}/user/my-orders`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
         });

        if(!response.ok) return;

        const data = await response.json();
        setMyOrders(data)
    }

    return (
      <AuthContext.Provider
        value={{
          username,
          token,
          isAuthenticated,
          myOrders,
          login,
          logout,
          getMyOrders,
        }}
      >
        {/* children here mean all app wrap in [AUTHprovider]*/}
        {children}
      </AuthContext.Provider>
    );

}

export default AuthProvider;