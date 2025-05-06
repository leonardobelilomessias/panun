"use client";
import { useQuery } from "@tanstack/react-query";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { fetchCities, fetchEstates, fetchNeighborhoods } from "@/lib/supabase/queries/client/locations";

export function SelectLocationFields() {
  const form = useFormContext();

  const estateId = form.watch("estate_id");
  const cityId = form.watch("city_id");

  const { data: estates } = useQuery({
    queryKey: ["estates"],
    queryFn: fetchEstates,
  });

  const { data: cities } = useQuery({
    queryKey: ["cities", estateId],
    queryFn: () => fetchCities(estateId),
    enabled: !!estateId,
  });

  const { data: neighborhoods } = useQuery({
    queryKey: ["neighborhoods", cityId],
    queryFn: () => fetchNeighborhoods(cityId),
    enabled: !!cityId,
  });

  return (
    <>
      <FormField
        control={form.control}
        name="estate_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estado</FormLabel>
            <FormControl>
              <select {...field} className="input border rounded p-2 w-full">
                <option value="">Selecione o estado</option>
                {estates?.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
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
              <select {...field} className="input border rounded p-2 w-full" disabled={!estateId}>
                <option value="">Selecione a cidade</option>
                {cities?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
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
              <select {...field} className="input border rounded p-2 w-full" disabled={!cityId}>
                <option value="">Selecione o bairro</option>
                {neighborhoods?.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.name}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
