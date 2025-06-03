import { Agent } from '@/types';
import localforage from 'localforage';

// Chave para armazenamento
const STORAGE_KEY = 'user';

// Tipos


// Função para salvar countries e themes
export const saveAgentLogged = async (
  agentLogged : Agent,
 
): Promise<void> => {
  try {
    // Cria o objeto de dados
    

    // Salva no localforage
    await localforage.setItem(STORAGE_KEY, agentLogged);
    console.log('Countries and themes saved successfully!');
  } catch (error) {
    console.error('Error saving countries and themes:', error);
  }
};

// Função para deletar countries e themes
export const deleteAgentLogged = async (): Promise<void> => {
  try {
    // Remove os dados do localforage
    await localforage.removeItem(STORAGE_KEY);
    console.log('Countries and themes deleted successfully!');
  } catch (error) {
    console.error('Error deleting countries and themes:', error);
  }
};

// Função para carregar countries e themes
export const loadAgentLogged = async (): Promise<Agent | null> => {
  try {
    // Carrega os dados do localforage
    const data = await localforage.getItem<Agent>(STORAGE_KEY);
    return data || null;
  } catch (error) {
    console.error('Error loading countries and themes:', error);
    return null;
  }
};