import { create } from "zustand";

interface DateStore {
  date: Date;
  setDate: (date: Date) => void;
}

export const useDateStore = create<DateStore>((set) => ({
  date: new Date(), // 初期値は現在の日付
  setDate: (date) => set({ date }),
}));
