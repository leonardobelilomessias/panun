import { IProfile } from '@/app/types/TypesDB';
import { create } from 'zustand';


type IStoreUser = {
  userStored: IProfile | null;
  setUserStored: (user: IProfile | null) => void;
};

console.log('em use store')
export const useStoreUser = create<IStoreUser >((set) => ({
  userStored: null, // Valor inicial
    setUserStored:   (value) => set({ userStored: value }), // Função para atualizar o valor
}));


