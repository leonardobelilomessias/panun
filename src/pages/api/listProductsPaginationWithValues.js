import { firestore } from '@/lib/firebase';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
    const { page = 1, pageSize = 10,city ,neighbrhood,type} = req.query;
   const values = req.query
   console.log(values)
    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(pageSize, 10);
    const offset = (pageNumber - 1) * pageLimit;

    try {
        let q = query(
            collection(firestore, 'products'),
            orderBy('updatedAt', 'desc'),
            limit(pageLimit)
        );

        if (pageNumber > 1) {
            const previousPageQuery = query(
                collection(firestore, 'products'),
                orderBy('updatedAt', 'desc'),
                limit(offset)
            );

            const previousPageSnapshot = await getDocs(previousPageQuery);
            const lastVisible = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];

            q = query(
                collection(firestore, 'products'),
                orderBy('updatedAt', 'desc'),
                startAfter(lastVisible),
                limit(pageLimit)
            );
        }

        const snapshot = await getDocs(q);
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Calcular o número total de documentos na coleção
        const totalDocsSnapshot = await getDocs(collection(firestore, 'products'));
        const totalDocs = totalDocsSnapshot.size;
        const totalPages = Math.ceil(totalDocs / pageLimit);

        res.status(200).json({ products, totalPages, currentPage: pageNumber });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}