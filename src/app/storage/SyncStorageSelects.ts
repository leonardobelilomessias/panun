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
export const saveCountriesAndThemes = (
  countries: Country[],
  themes: Theme[]
): void => {
  try {
    // Cria o objeto de dados
    const data: StorageData = { countries, themes };
    // Salva no localStorage (convertendo para string)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('Countries and themes saved successfully!');
  } catch (error) {
    console.error('Error saving countries and themes:', error);
  }
};

// Função para deletar countries e themes
export const deleteCountriesAndThemes = (): void => {
  try {
    // Remove os dados do localStorage
    localStorage.removeItem(STORAGE_KEY);
    console.log('Countries and themes deleted successfully!');
  } catch (error) {
    console.error('Error deleting countries and themes:', error);
  }
};

// Função para carregar countries e themes
export const loadCountriesAndThemes = (): StorageData | null => {
  try {
    // Carrega os dados do localStorage
    const storedData = localStorage.getItem(STORAGE_KEY);
    
    // Retorna null se não existir dados
    if (!storedData) {
      return null;
    }
    
    // Converte a string JSON de volta para objeto
    const data: StorageData = JSON.parse(storedData);
    return data;
  } catch (error) {
    console.error('Error loading countries and themes:', error);
    return null;
  }
};