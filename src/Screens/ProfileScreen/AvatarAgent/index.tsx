'use client'
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import ImageEmpty from '@/assets/images/common/no-image.jpg'
import { DialogFormAvatar } from "./DialogFormAvatar";
export type PropertyGalleryProps = {
    idAvatar: string;
    reloadEdit: () => void;
    avatar: string;
};

export function AvatarAgent({ avatar, idAvatar, reloadEdit }: PropertyGalleryProps) {
    return (
        <div className="space-y-4">
        <Card>
            <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Capa</h2>
                <DialogFormAvatar avatar={avatar} idAvatar={idAvatar} reloadEdit={reloadEdit} />
                </div>
                <div className=" flex flex-row bg-gray-100 items-center justify-center align-middle p-8">
                        <div className=" bg-white h-22 w-96 md:min-h-72 md:min-w-[22rem] relative object-cover">
                            {(!!avatar) &&
                                <Image src={avatar} fill className="absolute  pl-1 object-cover h-52 w-96" alt={`Imóvel cover`} />
                            }
                            {
                                !avatar &&
                                <Image src={ImageEmpty} fill className="absolute  pl-1 object-cover h-52 w-96" alt={`Imóvel `} />
                            }
                        </div>
                    

                </div>
            </CardContent>
        </Card>
        </div>
    );
}
