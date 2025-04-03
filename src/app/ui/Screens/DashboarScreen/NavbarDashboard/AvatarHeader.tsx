import { Avatar } from '@/components/ui/avatar';
import { useUserData } from '@/app/context/ContextUserAccont';
import Image from 'next/image';
import React from 'react';
import DefaultUserImage from '@/app/public/images/profile/default/avatar-default.jpg'
import { useStoreUser } from '@/app/context/store/storeUser';
interface AvatarHeaderProps {
    name: string;
    avatarUrl: string;
}

export const AvatarHeader: React.FC =  React.memo(() => {
    const {userStored} = useStoreUser()
    
    return (
    
            <Avatar className="w-[30px] h-[30px] relative"  >
                <Image alt='image user'  className='absolute' width={50} height={50} src={userStored?.avatar_url||DefaultUserImage}/>
            </Avatar>

    );
})

AvatarHeader.displayName = 'AvatarHeader'; 