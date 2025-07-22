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
import api from "@/lib/api";
import { deleteCookie, getCookie } from "@/lib/cookie";

interface AuthContextType {
  user: IUser;
  isExpired: boolean | null;
  expiredDate: Date;
  setUser: Dispatch<SetStateAction<any>>;
  setIsExpired: Dispatch<SetStateAction<boolean | null>>;
  setExpiredDate: Dispatch<SetStateAction<Date>>;
}

interface IUser {
  id?: string | undefined;
  username?: string | undefined;
  first_name?: string | undefined;
  last_name?: string | undefined;
  email?: string | undefined;
  status?: number | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
}
const AuthContext = createContext<AuthContextType>({
  user: {
    id: undefined,
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    status: 0,
    created_at: undefined,
    updated_at: undefined,
  },
  isExpired: null,
  expiredDate: new Date(),
  setUser: () => {},
  setIsExpired: () => {},
  setExpiredDate: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>({
    id: undefined,
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    email: undefined,
    status: 0,
    created_at: undefined,
    updated_at: undefined,
  });
  
  const [isExpired, setIsExpired] = useState<boolean | null>(null);
  const [expiredDate, setExpiredDate] = useState(new Date());
  const checkExpires = async (userId: string | undefined) => {
    if (userId) {
      const response = await api.post("/users/check_expires", { id: userId });
      setIsExpired(response.data.expired);
      if (response.data.expiredDate) {
        setExpiredDate(new Date(response.data.expiredDate));
      }
    }
  };

  const getUser = async () => {
    const token = await getCookie("Bearer_token");
    if (token) {
      try {
        const decoded = jwtDecode(token.split(" ")[1]);
        setUser(decoded as IUser);
        checkExpires((decoded as IUser).id);
      } catch (err) {
        console.error("Invalid token");
        deleteCookie("Bearer_token");
      }
    } else {
      setUser({
        id: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        status: 0,
        created_at: "",
        updated_at: "",
      });
      setIsExpired(null);
      setExpiredDate(new Date());
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isExpired,
        setIsExpired,
        expiredDate,
        setExpiredDate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);