import { create } from "zustand";
import { persist } from "zustand/middleware";

type countState = {
  pageNumber: number;
  setInputPage: () => void;
  setNotePage: () => void;
  setCalendarPage: () => void;
  setGraphPage: () => void;
  setSettingsPage: () => void;
};

export const usePageNumberStore = create(
  persist<countState>(
    (set) => ({
      pageNumber: 0,
      setInputPage: () => set(() => ({ pageNumber: 0 })),
      setNotePage: () => set(() => ({ pageNumber: 1 })),
      setCalendarPage: () => set(() => ({ pageNumber: 2 })),
      setGraphPage: () => set(() => ({ pageNumber: 3 })),
      setSettingsPage: () => set(() => ({ pageNumber: 4 })),
    }),
    { name: "page-number-state" }
  )
);
