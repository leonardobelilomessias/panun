import { LoginScreen } from "@/Screens/LoginScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Entrar',
  };
export default function login(){
    return(<LoginScreen/>)
}