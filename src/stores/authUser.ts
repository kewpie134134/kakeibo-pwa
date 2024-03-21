import { User } from "firebase/auth";
import { create } from "zustand";

type userState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthUser = create<userState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
}));
