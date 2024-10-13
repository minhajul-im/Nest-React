import { create } from "zustand";
import { ToggleType, MobileNavbarActionType } from "./type";

export const useMobileNavbar = create<MobileNavbarActionType & ToggleType>(
  (set) => ({
    isOpen: false,
    onOpen: () => set(() => ({ isOpen: true })),
    onClose: () => set(() => ({ isOpen: false })),
  })
);
