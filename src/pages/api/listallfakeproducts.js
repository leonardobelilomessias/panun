// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import fakelist from './products.json'
import { productSlug } from "@/lib/product";
export default async function asynchandler(req, res) {

  if (req.method === 'GET') {
    const productFake = fakelist
    const {title} = req.query;
    // const productsCol = collection(firestore, "products");
    // const productSnapshot = await getDocs(productsCol);
    // const productList = await  productSnapshot.docs.map(doc => doc.data());
    const product = fakelist.filter(
        (single) => productSlug(single.title) === title
        
      )[0];
  
    return res.status(200).json(fakelist);
    const { id } = req.query;
    
    // Simula a busca de informações do usuário com base no id
    const user = {
      id,
      name: "John Doe",
      email: "johndoe@example.com"
    };
    
    res.status(200).json(user);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }

}



