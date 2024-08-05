import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs/promises";
import { firestore, storage } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const uploadImageCover = async (file,fields) => {
    let {bucket} =  fields
   //console.log(file)

   //updateproduct
   //console.log(bucket)

    const fileBuffer = await fs.readFile(file.filepath);
    const storageRef = ref(storage, `covers/${bucket[0]}`);
    const snapshot = await uploadBytes(storageRef, fileBuffer, {
      contentType: file.mimetype,
    });
    const url = await getDownloadURL(snapshot.ref);
    const docRef = doc(firestore, 'products', bucket[0]);
    const docSnap = await getDoc(docRef);
    const product = docSnap.data()
    Object.assign(product,{cover:url})
    await updateDoc(docRef, product);
 
    return url;
  };



  
  export default uploadImageCover;
   