// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore, storage } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";


export class ListProductsFirebaseBySlug {

    async   list(slug){
      try {
        const q = query(collection(firestore, 'products'), where('slug', '==',slug.trim()));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          return []
        }
        
        const items = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if(!!data.createdAt){
            Object.assign(data,{createdAt: data?.createdAt?.toDate().toISOString()})
          }
          if(!!data.updatedAt){
            Object.assign(data,{updatedAt:data.updatedAt?.toDate().toISOString()})
          }

          items.push({ id: doc.id, ...data });
        });
   
        return items[0]; // Supondo que o título seja único
      } catch (error) {
        new Error({ error: error.message });
      }
    }

}
