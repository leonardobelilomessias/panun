// src/pages/api/image.js
import uploadImageCover from "@/lib/uploadCover";
import formidable from "formidable";

export const config = {
    api: {
      bodyParser: false, // Desabilita o parser de corpo interno do Next.js
    },
  };
  
  export default async function handler(req, res) {
    const form = formidable({ multiples: true });
  
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "File upload failed" });
      }
      
      let fileArray = files.files;
      if (!Array.isArray(fileArray)) {
        fileArray = [fileArray];
      }
      const {bucket} = fields
  // console.log('fields',fields)
  // console.log('fields',fileArray)

      try {
        // const uploadPromises = fileArray.map((file) => uploadImageCover(file,fields));
        // const urls = await Promise.all(uploadPromises);
       const url=  uploadImageCover(fileArray[0],fields)
        return res.status(200).json({ url });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to upload images" });
      }
    });
  }