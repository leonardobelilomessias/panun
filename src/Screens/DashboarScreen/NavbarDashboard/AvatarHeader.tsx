import { Avatar } from '@/components/ui/avatar';
import { useUserData } from '@/context/ContextUserAccont';
import Image from 'next/image';
import React from 'react';
import DefaultUserImage from '@/public/images/profile/default/avatar-default.jpg'
import { storeAgentLogged } from '@/context/store/storeAgentLogged';
interface AvatarHeaderProps {
    name: string;
    avatarUrl: string;
}

export const AvatarHeader: React.FC =  React.memo(() => {
    const {agentLogged} = storeAgentLogged()
    const urlavatar = !!agentLogged?.avatars_agents[0].url_image?agentLogged?.avatars_agents[0].url_image:DefaultUserImage
    return (
            <div>
                {/* {JSON.stringify(agentLogged?.avatars_agents)} */}
            <Avatar className="w-[30px] h-[30px] relative"  >
                <Image alt='image user'  className='absolute' width={50} height={50} src={urlavatar}/>
            </Avatar>
            </div>

    );
})

AvatarHeader.displayName = 'AvatarHeader'; 