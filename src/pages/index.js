import path from "path";
import fs from "fs/promises";

import HomePageSix from "./home/page-six";
import { ListProductsFirebase } from "@/lib/listProductsFireBase";

function HomePage({allproducts}) {

  return (
    <>
     <HomePageSix allproducts={allproducts}/>
    </>
  );
}

export async function getServerSideProps() {
  const list = new ListProductsFirebase()

  const filePath = path.join(process.cwd(), "src/data/hero/", "index.json");

  const Herodata = JSON.parse(await fs.readFile(filePath));
  try {
    const result = await list.list()
    console.log(result)
    
    // Fazendo a requisição para a API para obter a lista de produtos
  //   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/listproducts`);
  //   const allproducts = res.data;
  // const names ={tilio:"joune"}

    // Retornar os dados dos produtos como props
    const allproducts = result; 
    return {
      props: { allproducts, Herodata},
    };
  } catch (error) {
    // Lidar com erros na requisição
    console.error(error);
    return {
      props: { products: [] },
    };
  }

}

export default HomePage;
