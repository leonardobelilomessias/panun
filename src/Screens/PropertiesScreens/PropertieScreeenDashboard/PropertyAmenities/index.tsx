'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogFormAmenities } from './DialogFormAmenities';

export type PropertyAmenitiesProps = {
  reloadEdit:()=>void;
  idProperty:string;
  amenities: {
    id: string;
    name: string;
  }[];
};

// Lista completa de comodidades
const ALL_AMENITIES = [
  'Piscina',
  'Academia',
  'Salão de Festas',
  'Quadra Poliesportiva',
  'Churrasqueira',
  'Playground',
  'Espaço Gourmet',
  'Cinema',
  'Sala de Jogos',
  'Piscina Térmica',
  'Sauna',
  'Hidromassagem',
  'Portaria 24h',
  'Elevador',
  'Varanda',
  'Jardim',
  'Área de Serviço',
  'Lavanderia',
  'Cozinha Americana',
  'Armários Embutidos',
  'Closet',
  'Ar Condicionado',
  'Aquecedor',
  'Lareira',
  'Quintal',
  'Garagem Coberta',
  'Vista para o Mar',
  'Vista para Montanhas',
  'Segurança 24h',
  'Sistema de Alarme',
  'Câmeras de Segurança',
  'Acesso para Deficientes',
  'Pet Friendly',
  'Mobiliado',
  'Internet Fibra Óptica',
  'Gerador de Energia',
  'Sistema de Energia Solar',
  'Cisterna',
  'Poço Artesiano',
].sort();

export function PropertyAmenities({ amenities,idProperty,reloadEdit }: PropertyAmenitiesProps) {
  // Cria um Set com os nomes das comodidades disponíveis na propriedade
  const selectedAmenities = new Set(
    amenities.map((item) => item.name) ?? [] // Acessa corretamente o nome dentro de amenities
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <div className='flex justify-between'>
          <h3 className="text-2xl font-bold mb-4">Comodidades</h3>
          <DialogFormAmenities amenities={amenities} idProperty={idProperty} reloadEdit={reloadEdit}/>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {ALL_AMENITIES.map((name) => (
            <CheckItem key={name} label={name} checked={selectedAmenities.has(name)} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CheckItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={`amenity-${label}`} checked={checked} disabled />
      <label
        htmlFor={`amenity-${label}`}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
