// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore, storage } from "@/lib/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import fakelist from './products.json'
import { productSlug } from "@/lib/product";
export default async function asynchandler(req, res) {
  if (req.method === 'GET') {
    const { slug } = req.query;
    console.log(slug)
    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    try {
      const q = query(collection(firestore, 'products'), where('slug', '==', slug.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return res.status(404).json({ error: 'Item not found' });
      }

      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).json(items[0]); // Supondo que o título seja único
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}



