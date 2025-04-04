// import React from 'react';
// import { TipCard } from './TipCard';
// import { Button } from "@/components/ui/button";
// import { SquarePlus } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import Link from 'next/link';
// import { Tip, TipsSectionProps } from '@/app/types/TypesDB';

// export const TipsSection: React.FC<TipsSectionProps> = ({ data , title, iconTitle}) => {
//   const tips = data.tips as Tip[];

//   return (
//     <section className="container max-w-4xl mx-auto py-8 space-y-2">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           {iconTitle && React.createElement(iconTitle, { size: 20, className: " " })}
//           <h2 className="text-xl font-bold ">
//             {title}
//           </h2>
//         </div>
//         <Link href={'/dicas/criar-dica'} >
//         <Button variant="default" className='bg-primaryPalet' size="sm">
//           Ver Mais
//           <SquarePlus className="ml-2 h-4 w-4" />
//         </Button>
//         </Link>
//       </div>


//       <div className="grid gap-2">
//         {tips.map((tip,key) => (
//           <TipCard userId={data.userId} key={tip.id} tip={tip} />
//         ))}
//       </div>

//       <Separator />
//     </section>
//   );
// };

