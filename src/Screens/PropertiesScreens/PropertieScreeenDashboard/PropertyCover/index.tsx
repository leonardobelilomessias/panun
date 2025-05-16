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

        <Card>
            <CardContent>

                <h2 className="text-xl font-bold">Capa</h2>
                <DialogFormCover cover={cover} idProperty={idProperty} reloadEdit={reloadEdit} />
                <div className=" flex flex-row">
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
    );
}
