import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import {
  getPersistedState,
  getPersistedStateSession,
  persistState,
  persistStateSession,
} from "../utils/persist-util";

export interface IAuth {
  isLogIn?: boolean;
  token?: string;
  userId?: string;
  rememberMe?: boolean;
  lan?: string;
  name?: string;
}
export interface Category {
  id: string;
  name: string;
}
interface AuthContextProps {
  authState: IAuth;
  setAuthState: React.Dispatch<React.SetStateAction<IAuth>>;
  updateUserType: (newUserType: string) => void;
  setLogInStatus: (value: boolean) => void;
  changeLng: (value: string) => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  addCategory: (category: Category[]) => void;
}

interface AuthState {
  isLogIn?: boolean;
  userType?: string;
}
export const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const defaultState: IAuth = { lan: "en", isLogIn: false };

  const session: IAuth = getPersistedStateSession(
    process.env.REACT_APP_PERSIST_AUTH,
    defaultState
  );
  const local: IAuth = getPersistedState(
    process.env.REACT_APP_PERSIST_AUTH,
    defaultState
  );

  const initialState = local?.rememberMe ? local : session;
  const [authState, setAuthState] = useState<IAuth>(initialState);
  const [categories, setCategories] = useState<Category[]>([]);
  console.log("cate", categories);
  useEffect(() => {
    i18n.changeLanguage(authState?.lan || "en");
  }, [authState?.lan, i18n]);
  const initMount = useRef(true);

  useEffect(() => {
    if (!initMount.current) {
      if (!authState?.isLogIn) {
        !authState?.rememberMe &&
          sessionStorage.removeItem(process.env.REACT_APP_PERSIST_AUTH || "");
        authState?.rememberMe &&
          localStorage.removeItem(process.env.REACT_APP_PERSIST_AUTH || "");
      } else {
        authState?.rememberMe &&
          persistState(process.env.REACT_APP_PERSIST_AUTH || "", authState);
        !authState?.rememberMe &&
          persistStateSession(
            process.env.REACT_APP_PERSIST_AUTH || "",
            authState
          );
      }
    } else initMount.current = false;
  }, [authState]);
  useEffect(() => {
    if (!authState?.isLogIn) {
      !authState?.rememberMe &&
        sessionStorage.removeItem(process.env.REACT_APP_API_CATEGORIES || "");
      authState?.rememberMe &&
        localStorage.removeItem(process.env.REACT_APP_API_CATEGORIES || "");
    } else {
      authState?.rememberMe &&
        persistState(process.env.REACT_APP_API_CATEGORIES || "", categories);
      !authState?.rememberMe &&
        persistStateSession(
          process.env.REACT_APP_API_CATEGORIES || "",
          categories
        );
    }
  }, [categories, authState?.isLogIn, authState?.rememberMe]);
  const updateUserType = (newUserType: string) => {
    setAuthState((prevAuthState: AuthState) => ({
      ...prevAuthState,
      userType: newUserType,
    }));
  };
  const setLogInStatus = (status: boolean) => {
    setAuthState((prevAuthState: AuthState) => ({
      ...prevAuthState,
      isLogIn: status,
    }));
  };
  const changeLng = (newLng: string) => {
    setAuthState((prevAuthState: AuthState) => ({
      ...prevAuthState,
      lan: newLng,
    }));
  };
  const addCategory = (category: Category[]) => {
    setCategories((prevCategories) => [...prevCategories, ...category]);
  };
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        updateUserType,
        setLogInStatus,
        changeLng,
        categories,
        setCategories,
        addCategory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error Use Context");
  }
  return context;
};
