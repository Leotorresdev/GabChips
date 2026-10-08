import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserState = {
  name: string;
  email: string;
  totalComprado: number;
  isLoggedIn: boolean;
  login: (name: string, email: string, totalComprado?: number) => void;
  setTotalComprado: (amount: number) => void;
  logout: () => void;
};

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      totalComprado: 0,
      isLoggedIn: false,
      login: (name, email, totalComprado = 0) => 
        set({ 
          name: name.trim(), 
          email: email.trim().toLowerCase(), 
          totalComprado: Number(totalComprado || 0), 
          isLoggedIn: true 
        }),
      setTotalComprado: (amount) => set({ totalComprado: Number(amount || 0) }),
      logout: () => set({ name: "", email: "", totalComprado: 0, isLoggedIn: false }),
    }),
    {
      name: "gabchips-user",
    }
  )
);
