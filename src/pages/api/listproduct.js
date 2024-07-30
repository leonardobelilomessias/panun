// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore, storage } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import fakelist from './products.json'
import { productSlug } from "@/lib/product";
export default async function asynchandler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }

    try {
      const docRef = doc(firestore, 'products', id.trim() );
     console.log(id)
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        res.status(200).json(docSnap.data());
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }

}



