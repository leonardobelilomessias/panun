import { create } from 'zustand';

// Tipos
type ICountries = {
  name: string;
  code: string;
  id: string;
};

type IThemes = {
  name: string;
  code: string;
  id: string;
};

// Tipo para o store
type IStore = {
  countrieThemeStored: [ICountries[], IThemes[]]; // Array único para países e temas
  setCountrieThemeStored: (data: [ICountries[], IThemes[]]) => void; // Função para atualizar o array
};

// Store
export const useStoreSelect = create<IStore>((set) => ({
  countrieThemeStored: [[], []], // Valor inicial para o array combinado
  setCountrieThemeStored: (data) => set({ countrieThemeStored: data }), // Função para atualizar o array
}));