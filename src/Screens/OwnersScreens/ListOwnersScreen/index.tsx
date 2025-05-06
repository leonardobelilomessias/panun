import Link from "next/link";

export function ListOwnersScreen() {
    const owners = Array(10).fill(0).map((_, i) => {
        return {
            id: i,
            name: `Proprietário ${i + 1}`,
            email: `proprietario${i +  1}`,
            phone: `123456789${i}`,
            address: `Endereço ${i + 1}`,
            city: `Cidade ${i + 1}`,
            state: `Estado ${i + 1}`,
            zipCode: `12345-678${i}`,
            country: `País ${i + 1}`,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });
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
          <p>Endereço: {owner.address}</p>
          <p>Cidade: {owner.city}</p>
          <p>Estado: {owner.state}</p>
          <p>CEP: {owner.zipCode}</p>
          <p>País: {owner.country}</p>
          <p>Criado em: {owner.createdAt.toLocaleDateString()}</p>
        </div>
      ))}
      {/* Aqui você pode adicionar a lógica para listar os proprietários */}
    </div>
  );
}