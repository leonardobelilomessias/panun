import { firestore } from "@/lib/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const {  docId, data } = req.body;
  
        // Verifique se os dados necessários estão presentes
        if ( !docId || !data) {
          return res.status(400).json({ error: 'Dados insuficientes' });
        }
  
        // Atualiza o documento no Firestore
        const docRef = doc(firestore, 'products', docId);
        Object.assign(data,{updatedAt:serverTimestamp()})
        await updateDoc(docRef, data);
  
        // Responde com sucesso
        res.status(200).json({ message: 'Documento atualizado com sucesso' });
      } catch (error) {
        console.error('Erro ao atualizar o documento:', error);
        res.status(500).json({ error: 'Erro ao atualizar o documento' });
      }
    } else {
      // Método não permitido
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Método ${req.method} não permitido`);
    }
  }