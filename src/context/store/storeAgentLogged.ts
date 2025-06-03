import { Agent } from '@/types';
import { create } from 'zustand';


type IStoreUser = {
  agentLogged: Agent | null;
  setgentLogged: (user: Agent | null) => void;
};

console.log('em use store agentLogged')
export const storeAgentLogged = create<IStoreUser >((set) => ({
  agentLogged: null, // Valor inicial
  setgentLogged:   (value) => set({ agentLogged: value }), // Função para atualizar o valor
}));


