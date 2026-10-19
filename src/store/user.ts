import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  name: string;
  username: string;
  email: string;
  totalComprado: number;
  isLoggedIn: boolean;
  login: (name: string, email: string, totalComprado?: number, username?: string) => void;
  setTotalComprado: (amount: number) => void;
  logout: () => void;
};

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      username: "",
      email: "",
      totalComprado: 0,
      isLoggedIn: false,
      login: (name, email, totalComprado = 0, username = "") => 
        set({ 
          name: name.trim(), 
          username: (username || name).trim().toLowerCase().replace(/[^a-z0-9_.-]/g, ''),
          email: email.trim().toLowerCase(), 
          totalComprado: Number(totalComprado || 0), 
          isLoggedIn: true 
        }),
      setTotalComprado: (amount) => set({ totalComprado: Number(amount || 0) }),
      logout: () => set({ name: "", username: "", email: "", totalComprado: 0, isLoggedIn: false }),
    }),
    {
      name: "gabchips-user",
    }
  )
);
