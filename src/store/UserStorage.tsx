// context/UserStorageContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "src/models/UserModel";

interface UserStorageContextType {
  user: User | null;
  login: (userData: User) => void;
  updateUser: (userData: User) => void;
  logout: () => void;
  updateWallet: (newWallet: number) => void;
}

const UserStorageContext = createContext<UserStorageContextType | undefined>(undefined);

export const UserStorageProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Se o objeto estiver aninhado, extrai a parte interna
      setUser(parsedUser.user ? parsedUser.user : parsedUser);
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

  const updateUser = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const updateWallet = (newWallet: number) => {
    if (user) {
      const updatedUser = { ...user, wallet: newWallet };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <UserStorageContext.Provider value={{ user, login, logout, updateWallet, updateUser }}>
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
