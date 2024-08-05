// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function asynchandler(req, res) {
  try {
    const productsCol = collection(firestore, "products");
    const productSnapshot = await getDocs(productsCol);
    
    // Mapeia os documentos e inclui o ID junto com os dados
    const productList = productSnapshot.docs.map(doc => ({
      id: doc.id, // Inclui o ID do documento
      ...doc.data() // Inclui os dados do documento
    }));
    
    return res.status(200).json(productList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
