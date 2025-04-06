
import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "youtuber" | "sponsor";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  isVerified: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    name: "Tech Sponsor",
    email: "sponsor@example.com",
    role: "sponsor",
    avatar: "https://i.pravatar.cc/150?img=3",
    isVerified: true,
  },
  {
    id: "2",
    name: "Gaming Channel",
    email: "youtuber@example.com",
    role: "youtuber",
    avatar: "https://i.pravatar.cc/150?img=4",
    isVerified: true,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("verisponsor_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem("verisponsor_user", JSON.stringify(foundUser));
          resolve(foundUser);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<User> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
          reject(new Error("User already exists"));
        } else {
          const newUser: User = {
            id: Math.random().toString(36).substring(7),
            name,
            email,
            role,
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
            isVerified: false,
          };
          
          // In a real app, we would add this user to a database
          setUser(newUser);
          localStorage.setItem("verisponsor_user", JSON.stringify(newUser));
          resolve(newUser);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("verisponsor_user");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
