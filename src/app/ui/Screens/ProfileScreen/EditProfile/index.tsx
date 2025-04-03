'use client'

import { ContainerScreen } from '@/app/ui/components/Containers/ContainerSceen';
import { FormProfile } from '../FormProfile';
import { AvatarUpload } from '../components/AvatarUpload';
import { IProfile } from '@/app/types/TypesDB';

const EditProfile: React.FC<{ user: IProfile }> = ({ user }) => {
  
  return (
    <ContainerScreen>
      <div className="mb-8">
        <AvatarUpload
          userId={user.id}
          avatarUrl={user.avatar_url}
          userName={user.full_name as string}
        />
      </div>
      <FormProfile userId={user.id} initialData={user} />
    </ContainerScreen>
  );
};

export default EditProfile;