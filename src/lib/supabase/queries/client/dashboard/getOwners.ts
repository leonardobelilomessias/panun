'use server'
import { createClient } from "@/utils/supabase/server"


export interface Owner {
  id: string
  name: string
  email: string
  phone: string
  type: string
  status: string
  city: string
  estate: string
  propertyCount: number
}

export async function getOwners(search?: string): Promise<{ owners: Owner[]; error: string | null }> {
  const supabase = await createClient()

  let query =  supabase
    .from("owners")
    .select(
      `
      id,
      name,
      email,
      phone,
      type,
      status,
      cities(id,name),
      estates(name,uf),
      properties(count)
    `,
      { count: "exact" }
    )

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,city.ilike.%${search}%`
    )
  }

  const { data, error } = await query

  if (error) {
    return { owners: [], error: error.message }
  }

  const owners = data.map((owner: any) => ({
    id: owner.id,
    name: owner.name,
    email: owner.email,
    phone: owner.phone,
    type: owner.type,
    status: owner.status,
    city: owner.cities.name,
    estate: owner.estates.uf,
    propertyCount: owner.properties?.length ?? 0,
  }))

  return { owners, error: null }
}
