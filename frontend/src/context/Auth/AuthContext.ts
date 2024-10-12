import { createContext, useContext } from "react";

// defines the structure of the data that will be
// stored in the context. It has two properties:
interface AuthContextType {
    username: string | null;
    token: string | null;
    //
    isAuthenticated: boolean;
    // to implement the set value 
    // from AUTHprovider component
    // we need the login function:
     login: (username: string, token: string) => void;
    // to logout we must clean local storage
     logout: () => void;
}

//(*)Overall Purpose:
//  This code creates a context named AuthContext
//  that can be used to store and share 
//  authentication-related data (username and token) 
//  between different components in your React application.
//  The useAuth hook provides a convenient 
//  way to access this context data within your components.

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

// useAuth. This hook uses the useContext hook to access the AuthContext created earlier.
export const useAuth = () => useContext(AuthContext);