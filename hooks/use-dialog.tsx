import { create } from "zustand"

interface useDialogInterface {
   isOpen: boolean
   onOpen: () => void
   onClose: () => void
}

export const useDialog = create<useDialogInterface>((set) => ({
   isOpen: false,
   onOpen: () => set({ isOpen: true }),
   onClose: () => set({ isOpen: false }),
}))
