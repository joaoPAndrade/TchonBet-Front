// context/UserStorageContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "src/models/UserModel";

interface UserStorageContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserStorageContext = createContext<UserStorageContextType | undefined>(undefined);

export const UserStorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserStorageContext.Provider value={{ user, login, logout }}>
      {children}
    </UserStorageContext.Provider>
  );
};

export const useUserStorage = () => {
  const context = useContext(UserStorageContext);
  if (!context) {
    throw new Error("useUserStorage deve ser usado dentro de UserStorageProvider");
  }
  return context;
};
