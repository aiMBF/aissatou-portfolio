
import { create } from 'zustand';

type Language = 'en' | 'fr';

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'en', // Default language
  setLanguage: (language) => set({ language }),
}));
