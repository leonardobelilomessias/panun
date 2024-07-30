// src/pages/api/image.js
import uploadImage from "@/lib/uploadImage";
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
  
      try {
        const uploadPromises = fileArray.map((file) => uploadImage(file,fields));
        const urls = await Promise.all(uploadPromises);
        return res.status(200).json({ urls });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to upload images" });
      }
    });
  }