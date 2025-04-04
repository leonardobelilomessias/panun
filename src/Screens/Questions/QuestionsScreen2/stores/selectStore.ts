import { create } from 'zustand';


type SelectStateCountryQuestions = {
  selectedValueCountryQuestions: string;
  setSelectedValueCountryQuestions: (value: string) => void;
};
type SelectStateThemeQuestions = {
    selectedValueThemeQuestions: string;
    setSelectedValueThemeQuestions: (value: string) => void;
  };

export const useSelectStoreThemeQuestions = create<SelectStateThemeQuestions>((set) => ({
    selectedValueThemeQuestions: '', // Valor inicial
    setSelectedValueThemeQuestions: (value) => set({ selectedValueThemeQuestions: value }), // Função para atualizar o valor
}));

export const useSelectStoreContryQuestions = create<SelectStateCountryQuestions>((set) => ({
    selectedValueCountryQuestions: '', // Valor inicial
    setSelectedValueCountryQuestions: (value) => set({ selectedValueCountryQuestions: value }), // Função para atualizar o valor
  }))
