import { Models } from 'appwrite';
import { create } from 'zustand';

interface ModalState {
  session: Models.Session | null;
  setSession: (session: Models.Session) => void;
  removeSession: () => void;
}

export const useAuthStore = create<ModalState>((set) => ({
  session: null,
  setSession: (session) => set({ session: session }),
  removeSession: () => {
    document.cookie =
      'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    set({ session: null });
  },
}));
