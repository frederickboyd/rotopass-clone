"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  user: IUser;
  setUser: Dispatch<SetStateAction<any>>;
}

interface IUser {
  id?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}
const AuthContext = createContext<AuthContextType>({
  user: {
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    status: 0,
    created_at: "",
    updated_at: "",
  },
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    status: 0,
    created_at: "",
    updated_at: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("Bearer_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded as IUser);
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("Bearer_token");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
