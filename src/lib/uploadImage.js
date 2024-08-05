import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fs from "fs/promises";
import { storage } from "./firebase";
import sharp from 'sharp';

const uploadImage = async (file,fields) => {
    let {bucket} =  fields
    const tempPath = file.filepath;
   //console.log(file)
   const fileBuffer = await fs.readFile(tempPath);
   const resizedImageBuffer = await sharp(fileBuffer)
   .resize({ width: 800,height:561 })
   .toBuffer();
    const storageRef = ref(storage, `${bucket[0]}/${file.newFilename}`);
    const snapshot = await uploadBytes(storageRef, resizedImageBuffer, {
      contentType: file.mimetype,
    });
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };



  
  export default uploadImage;
   