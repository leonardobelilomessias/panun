import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "./firebase";

export class ListImagesFireStorage{
    async list(id){
        try {
            const listRef = ref(storage, id.trim());
            const list = await listAll(listRef);
            const urls = await Promise.all(
              list.items.map(item => getDownloadURL(item))
            );
             return {urls} ;
          } catch (error) {
           return new Error(error);
          }
    }
}