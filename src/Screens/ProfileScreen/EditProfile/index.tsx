'use client'

import { ContainerScreen } from '@/components/modules/Containers/ContainerSceen';
import { FormProfile } from '../FormProfile';
import { AvatarUpload } from '../components/AvatarUpload';
import { IProfile } from '@/types/TypesDB';

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