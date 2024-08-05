// src/pages/api/uploadImages.js
import uploadImage from "@/lib/uploadImage";
import { IncomingForm } from "formidable";

import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm({ multiples: true });

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
      const uploadPromises = fileArray.map((file) => uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      res.status(200).json({ urls });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to upload images" });
    }
  });
}
