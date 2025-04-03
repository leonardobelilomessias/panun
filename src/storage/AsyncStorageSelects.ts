import localforage from 'localforage';

// Chave para armazenamento
const STORAGE_KEY = 'countriesAndThemes';

// Tipos
type Country = {
  id: string;
  name: string;
  code: string;
};

type Theme = {
  id: string;
  name: string;
  code: string;
};

type StorageData = {
  countries: Country[];
  themes: Theme[];
};

// Função para salvar countries e themes
export const saveCountriesAndThemes = async (
  countries: Country[],
  themes: Theme[]
): Promise<void> => {
  try {
    // Cria o objeto de dados
    const data: StorageData = { countries, themes };

    // Salva no localforage
    await localforage.setItem(STORAGE_KEY, data);
    console.log('Countries and themes saved successfully!');
  } catch (error) {
    console.error('Error saving countries and themes:', error);
  }
};

// Função para deletar countries e themes
export const deleteCountriesAndThemes = async (): Promise<void> => {
  try {
    // Remove os dados do localforage
    await localforage.removeItem(STORAGE_KEY);
    console.log('Countries and themes deleted successfully!');
  } catch (error) {
    console.error('Error deleting countries and themes:', error);
  }
};

// Função para carregar countries e themes
export const loadCountriesAndThemes = async (): Promise<StorageData | null> => {
  try {
    // Carrega os dados do localforage
    const data = await localforage.getItem<StorageData>(STORAGE_KEY);
    return data || null;
  } catch (error) {
    console.error('Error loading countries and themes:', error);
    return null;
  }
};