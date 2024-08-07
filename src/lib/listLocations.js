// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export class ListProductsFirebase {
    async   list(){
        console.log('dentro')
        try {
            const productsCol = collection(firestore, "products");
            const productSnapshot = await getDocs(productsCol);
            
            // Mapeia os documentos e inclui o ID junto com os dados
            const productList = productSnapshot.docs.map(doc => {
              const data = doc.data()
              if(!!data.createdAt){
                Object.assign(data,{createdAt: data?.createdAt?.toDate().toISOString()})
              }
              if(!!data.updatedAt){
                Object.assign(data,{updatedAt:data?.updatedAt?.toDate().toISOString()})
              }
             return  {id: doc.id, ...data }
        });
            
            return productList ;
          } catch (error) {
            return new Error(error);
          }
    }

}
