// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
          const product = req.body;
          const docId = await addProduct(product);
          res.status(200).json({ id: docId });
        } catch (error) {
          res.status(500).json({ error: 'Failed to add product' });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
  }


  const addProduct = async (product) => {
    try {
      const docRef = await addDoc(collection(firestore, "products"), product);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  };


  