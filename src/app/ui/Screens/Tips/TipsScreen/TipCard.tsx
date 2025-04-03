// import React from 'react';
// import Image from 'next/image';
// import { formatDate } from '@/app/util/FormatDate';
// import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
// import { Avatar } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { ThumbsUp, Calendar } from "lucide-react";
// import Link from 'next/link';
// import { DropdownCard } from './DropDownCard';
// import AvatarDefault from '@/app/public/images/profile/default/avatar-default.jpg';
// import { Tip } from '@/app/types/TypesDB';
// interface TipCardProps {
//   tip: Tip;
//   userId: string | undefined;
// }

// export function TipCard({ tip,userId }: TipCardProps) {
//   return (
//     <Card className="hover:shadow-lg transition-shadow">
//         <CardHeader className="space-y-0 pb-2  flex flex-row justify-between ">
//           <div className="flex items-center space-x-3">
//             <Avatar className="h-8 w-8">
//         <Image 
//           width={500} 
//           height={500} 
//           className='object-cover relative w-full h-full' 
//           src={tip?.profile.avatar_url ? tip.profile.avatar_url : AvatarDefault} 
//           alt={tip?.profile?.full_name || "Avatar"} 
//         />
      
//             </Avatar>
//             <div className="flex flex-col">
//               <span className="font-medium text-xs">{tip.profile.full_name}</span>
//               <div className="flex items-center text-xs text-muted-foreground">
//                 <Calendar className="mr-1 h-3 w-3" />
//                 <span>{formatDate(tip.created_at).extendTime}</span>
//               </div>
//             </div>
//           </div>
//               { userId === tip.profile.id && 

//           <div>
//             <DropdownCard tipId={tip.id}  />
//           </div>
//           }
//         </CardHeader>
//         <Link href={`/dica/${tip.id}`}>

//         <CardContent className="">


//           <h3 className="text-md font-semibold">
//             {tip.title}
//           </h3>

//           <p className="text-muted-foreground line-clamp-3">
          
//           </p>
//         </CardContent>

//         <CardFooter className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Badge variant="secondary">
//               {tip.theme.name}
//             </Badge>
//             <Badge variant="secondary">
//               {tip.country.name}
//             </Badge>
//           </div>
//           <div className="flex items-center text-primaryPalet">
//             <ThumbsUp className="h-4 w-4 mr-1" />
//             <span className="text-sm">{tip.likes_count}</span>
//           </div>
//         </CardFooter>
//     </Link>
//       </Card>
//   );
// }




