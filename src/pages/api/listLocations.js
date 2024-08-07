// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function asynchandler(req, res) {
  try {
    const locations = collection(firestore, "locations");
    const locationsSnapshot = await getDocs(locations);
    
    // Mapeia os documentos e inclui o ID junto com os dados
    const locationsList = locationsSnapshot.docs.map(doc => ({
      id: doc.id, // Inclui o ID do documento
      ...doc.data() // Inclui os dados do documento
    }));
    
    return res.status(200).json(locationsList);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
