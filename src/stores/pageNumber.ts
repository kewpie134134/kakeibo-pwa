import { create } from "zustand";

type countState = {
  pageNumber: number;
  setInputPage: () => void;
  setNotePage: () => void;
  setCalendarPage: () => void;
  setGraphPage: () => void;
  setSettingsPage: () => void;
};

export const usePageNumberStore = create<countState>((set) => ({
  pageNumber: 0,
  setInputPage: () => set(() => ({ pageNumber: 0 })),
  setNotePage: () => set(() => ({ pageNumber: 1 })),
  setCalendarPage: () => set(() => ({ pageNumber: 2 })),
  setGraphPage: () => set(() => ({ pageNumber: 3 })),
  setSettingsPage: () => set(() => ({ pageNumber: 4 })),
}));
