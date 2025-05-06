'use server'
import { createClient } from "@/utils/supabase/server";

export async function insertOwner(data:any) {
    
    const supabase = await createClient()
    return await supabase.from("owners").insert([data]);
  }