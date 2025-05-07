'use client';
import { listOwners } from "@/lib/supabase/queries/client/Owners/listOwners";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ListOwnersScreen() {
  const [owners,setOwners] = useState<any[]>()
  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await listOwners();
        setOwners(response);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };
    fetchOwners();
  }, []);
  if (!owners) {
    return <div>Loading...</div>;
  }
    
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Lista de Proprietários</h1>
      <p>Esta é a lista de proprietários cadastrados.</p>
      <div>
        <Link href="/proprietarios/novo-proprietario">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar Proprietário
        </button>
        </Link>
        <Link href="/proprietarios">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Voltar
        </button>
        </Link>
      </div>
      { owners.map((owner) => (
        <div key={owner.id} className="border p-4 mb-2 rounded">
          <h2 className="text-xl font-bold">{owner.name}</h2>
          <p>Email: {owner.email}</p>
          <p>Telefone: {owner.phone}</p>
          <p>Estado: {owner.state}</p>
          <p>Cidade: {owner.city}</p>
          <p>Bairro: {owner.neighborhood}</p>
        </div>
      ))}
      {/* Aqui você pode adicionar a lógica para listar os proprietários */}
    </div>
  );
}