// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function asynchandler(req, res) {
  const productsCol = collection(firestore, "products");
  const productSnapshot = await getDocs(productsCol);
  const productList = await  productSnapshot.docs.map(doc => doc.data());
  return res.status(200).json(productList);
}
