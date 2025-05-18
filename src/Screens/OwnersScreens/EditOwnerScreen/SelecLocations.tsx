"use client";
import { useQuery } from "@tanstack/react-query";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { fetchCities, fetchEstates, fetchNeighborhoods } from "@/lib/supabase/queries/client/locations";
import { Owner } from "@/types";
import { useEffect } from "react";

export function SelectLocationFields({ owner }: { owner?: Owner | null }) {
  const form = useFormContext();
  const estateId = form.watch("estate_id");
  const cityId = form.watch("city_id");

  // Consulta para buscar estados
  const { 
    data: estates,
    isLoading: estatesLoading 
  } = useQuery({
    queryKey: ["estates"],
    queryFn: fetchEstates,
  });

  // Consulta para buscar cidades com base no estado selecionado
  const { 
    data: cities, 
    isLoading: citiesLoading,
    refetch: refetchCities 
  } = useQuery({
    queryKey: ["cities", estateId],
    queryFn: () => fetchCities(estateId),
    enabled: !!estateId,
  });

  // Consulta para buscar bairros com base na cidade selecionada
  const { 
    data: neighborhoods, 
    isLoading: neighborhoodsLoading,
    refetch: refetchNeighborhoods 
  } = useQuery({
    queryKey: ["neighborhoods", cityId],
    queryFn: () => fetchNeighborhoods(cityId),
    enabled: !!cityId,
  });

  // Este efeito executa quando o componente é montado e quando o proprietário muda
  useEffect(() => {
    if (owner && owner.estate_id) {
      // Garante que o estado esteja definido
      form.setValue("estate_id", owner.estate_id);
      
      // Se tivermos um estado, busque as cidades imediatamente
      if (owner.estate_id) {
        refetchCities();
      }
      
      // Se tivermos cidade e bairro, configure-os após as cidades serem carregadas
      if (owner.city_id) {
        form.setValue("city_id", owner.city_id);
        refetchNeighborhoods();
        
        if (owner.neighborhood_id) {
          form.setValue("neighborhood_id", owner.neighborhood_id);
        }
      }
    }
  }, [owner, form, refetchCities, refetchNeighborhoods]);

  return (
    <>
      <FormField
        control={form.control}
        name="estate_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <select 
                {...field} 
                className="input border rounded p-2 w-full"
                onChange={(e) => {
                  field.onChange(e);
                  // Quando o estado muda, limpe cidade e bairro
                  form.setValue("city_id", "");
                  form.setValue("neighborhood_id", "");
                }}
              >
                <option value="">Selecione o estado</option>
                {estatesLoading ? (
                  <option value="">Carregando estados...</option>
                ) : (
                  estates?.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))
                )}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="city_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cidade</FormLabel>
            <FormControl>
              <select 
                {...field} 
                className="input border rounded p-2 w-full" 
                disabled={!estateId || citiesLoading}
                onChange={(e) => {
                  field.onChange(e);
                  // Quando a cidade muda, limpe o bairro
                  form.setValue("neighborhood_id", "");
                }}
              >
                <option value="">Selecione a cidade</option>
                {citiesLoading ? (
                  <option value="">Carregando cidades...</option>
                ) : cities?.length === 0 ? (
                  <option value="">Nenhuma cidade encontrada</option>
                ) : (
                  cities?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                )}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="neighborhood_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bairro</FormLabel>
            <FormControl>
              <select 
                {...field} 
                className="input border rounded p-2 w-full" 
                disabled={!cityId || neighborhoodsLoading}
              >
                <option value="">Selecione o bairro</option>
                {neighborhoodsLoading ? (
                  <option value="">Carregando bairros...</option>
                ) : neighborhoods?.length === 0 ? (
                  <option value="">Nenhum bairro encontrado</option>
                ) : (
                  neighborhoods?.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.name}
                    </option>
                  ))
                )}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}