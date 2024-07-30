import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs/promises";
import { storage } from "./firebase";

const uploadImage = async (file,fields) => {
    let {bucket} =  fields
    console.log(bucket)
    const fileBuffer = await fs.readFile(file.filepath);
    const storageRef = ref(storage, `${bucket[0]}/${file.newFilename}`);
    const snapshot = await uploadBytes(storageRef, fileBuffer, {
      contentType: file.mimetype,
    });
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };
  
  export default uploadImage;
   