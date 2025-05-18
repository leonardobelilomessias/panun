import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { DialogFormCover } from "./DialogFormCover";
import ImageEmpty from '@/assets/images/common/no-image.jpg'
export type PropertyGalleryProps = {
    idProperty: string;
    reloadEdit: () => void;
    cover: string;
};

export function PropertyCover({ cover, idProperty, reloadEdit }: PropertyGalleryProps) {
    return (
        <div className="space-y-4">
        <Card>
            <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between">
                <h2 className="text-2xl font-bold">Capa</h2>
                <DialogFormCover cover={cover} idProperty={idProperty} reloadEdit={reloadEdit} />
                </div>
                <div className=" flex flex-row bg-gray-100 items-center justify-center align-middle p-8">
                        <div className=" bg-white h-22 w-96 md:min-h-72 md:min-w-[22rem] relative object-cover">
                            {(!!cover) &&
                                <Image src={cover} fill className="absolute  pl-1 object-cover h-52 w-96" alt={`Imóvel cover`} />
                            }
                            {
                                !cover &&
                                <Image src={ImageEmpty} fill className="absolute  pl-1 object-cover h-52 w-96" alt={`Imóvel `} />
                            }
                        </div>
                    

                </div>
            </CardContent>
        </Card>
        </div>
    );
}
