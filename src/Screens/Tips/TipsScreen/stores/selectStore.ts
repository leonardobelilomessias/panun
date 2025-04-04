import { create } from 'zustand';


type SelectStateCountryTips = {
  selectedValueCountryTips: string;
  setSelectedValueCountryTips: (value: string) => void;
};
type SelectStateThemeTips = {
    selectedValueThemeTips: string;
    setSelectedValueThemeTips: (value: string) => void;
  };

export const useSelectStoreThemeTips = create<SelectStateThemeTips>((set) => ({
    selectedValueThemeTips: '', // Valor inicial
    setSelectedValueThemeTips: (value) => set({ selectedValueThemeTips: value }), // Função para atualizar o valor
}));

export const useSelectStoreContryTips = create<SelectStateCountryTips>((set) => ({
    selectedValueCountryTips: '', // Valor inicial
    setSelectedValueCountryTips: (value) => set({ selectedValueCountryTips: value }), // Função para atualizar o valor
  }))
