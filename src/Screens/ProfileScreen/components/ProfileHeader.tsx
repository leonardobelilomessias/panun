import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import AvatarDefault from '@/public/images/profile/default/avatar-default.jpg';
import { EditIcon } from 'lucide-react';
import Link from 'next/link';
import { IProfile } from '@/types/TypesDB';
import { Button } from '@/components/ui/button';


export function ProfileHeader({ user }:{user:IProfile})  {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-lg p-4 mb-4 relative">
      <Avatar className="w-32 h-32 md:w-40 md:h-40 mr-0 md:mr-8 mb-4 md:mb-0 static" style={{position:"static"}}>
        <Image 
          width={500} 
          height={500} 
          className='object-cover relative w-full h-full' 
          src={user.avatar_url ? user.avatar_url : AvatarDefault} 
          alt={user.full_name || 'Avatar do usuário'} 
        />
      </Avatar>
      <div className="text-center md:text-left flex-grow">
        <h1 className="text-lg md:text-xl font-bold text-primary-palet">{user.full_name}</h1>
        <p className="text-gray-600 text-sm">Origem: {user.origem || 'Não informado'}</p>
        <p className="text-gray-600 text-sm">Atualmente em: {user.current_in || 'Não informado'}</p>
        <p className="text-sm text-gray-500">{user.bio || 'Nenhuma biografia disponível'}</p>
      </div>
      <Link href={`/editar-perfil/${user.id}`} className="absolute top-1 right-1 md:top-4 md:right-4 text-blue-600 hover:underline">
        <Button size={'sm'}  className="text-primary-palet hover:bg-blue-50 bg-white border border-primary-palet">
            <EditIcon size={16} className="inline-block mr-1" /> Editar Perfil
        </Button>
      </Link>
    </div>
  );
};

export default ProfileHeader; 