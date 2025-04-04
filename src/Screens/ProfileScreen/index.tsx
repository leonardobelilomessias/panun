import ProfileHeader from './components/ProfileHeader';
import GenericTipList from '../../components/modules/GenericListTips';
import { Lightbulb } from 'lucide-react';
import { ContainerScreen } from '../../components/modules/Containers/ContainerSceen';
import { fetchTipsPagination } from '@/lib/supabase/queries/server/fetchTipsPagination';



export const ProfileScreen = async ({user}:{user:any}) => {
  const {tips} =  await fetchTipsPagination(1, 5);
  return (
    <ContainerScreen>
        <ProfileHeader user={user} />
        <GenericTipList  />
    </ContainerScreen>
  );
};
