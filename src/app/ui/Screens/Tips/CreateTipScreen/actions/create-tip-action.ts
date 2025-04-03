'use server'

import { revalidatePath } from 'next/cache'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/server'
import { Tip } from '@/app/types/TypesDB';
export const insertTip = async (data:any): Promise<PostgrestSingleResponse<any| Tip>> => {
  const supabase = await createClient()
  const resp = await supabase 
  .from('tips')
  .insert([
    data
  ])
  .select();
  console.log(resp)
   revalidatePath('/dicas')
  return resp

};