import { firestore, storage } from '@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, listAll, deleteObject, getMetadata } from 'firebase/storage';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      // Deletar todos os objetos no bucket com o prefixo do ID do produto
      await deleteAllObjectsInBucket(id);

      // Deletar documento no Firestore
      //await deleteProductDocument(id);

      res.status(200).json({ message: "Produto e bucket deletados com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar produto e bucket:", error);
      res.status(500).json({ error: "Erro ao deletar produto e bucket." });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}

const deleteProductDocument = async (id) => {
  try {
    const docRef = doc(firestore, 'produtos', id);
    
    await deleteDoc(docRef);
    console.log(`Documento com ID ${id} deletado do Firestore.`);
  } catch (error) {
    throw new Error(`Erro ao deletar documento: ${error.message}`);
  }
};

const deleteAllObjectsInBucket = async (prefix) => {
  try {
    const bucketRef = ref(storage, prefix);

    const list = await listAll(bucketRef);
    console.log(list)
    const deletePromises = list.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deletePromises);

    console.log(`Todos os objetos com o prefixo ${prefix} deletados do Firebase Storage.`);
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      console.log(`Nenhum objeto encontrado com o prefixo ${prefix} no Firebase Storage. Nenhuma ação necessária.`);
    } else {
      throw new Error(`Erro ao deletar objetos: ${error.message}`);
    }
  }
}; 