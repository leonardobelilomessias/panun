import { storage } from "@/lib/firebase";
import { deleteObject, ref } from "firebase/storage";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { productId, imageUrls } = req.body;

      if (!productId || !Array.isArray(imageUrls) || imageUrls.length === 0) {
        return res.status(400).json({ error: 'ID do produto inválido ou array de URLs inválido ou vazio' });
      }

      const deletePromises = imageUrls.map(async (imageUrl) => {
        try {
          // Extrai o caminho relativo do URL do Firebase Storage
          const storagePath = decodeURIComponent(imageUrl.split('/o/')[1].split('?')[0]);

          // Verifica se a URL da imagem contém o ID do produto
          if (!storagePath.startsWith(productId)) {
            throw new Error(`A imagem ${imageUrl} não pertence ao produto ${productId}`);
          }

          // Cria uma referência ao arquivo usando o caminho
          const fileRef = ref(storage, storagePath);

          // Deleta o arquivo
          await deleteObject(fileRef);
          console.log(`Imagem deletada: ${imageUrl}`);
        } catch (error) {
          console.error(`Erro ao deletar imagem ${imageUrl}:`, error);
        }
      });

      await Promise.all(deletePromises);
      return res.status(200).json({ message: 'Imagens deletadas com sucesso' });
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
      return res.status(500).json({ error: 'Erro ao processar a solicitação' });
    }
  } else {
    // Método não permitido
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}