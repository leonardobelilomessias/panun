import { supabaseClient } from "@/lib/supabase/client"

const  getCountries =(async ()=>{
    try{

        const { data, error } = await supabaseClient()
        .from('countries',)
        .select('*') // Ou especifique as colunas: .select('id, name')
        .order('name', { ascending: true }) // Ordena pelo nome
        // .limit(20); // Retorna apenas 20 resultados
        if (error) {
            console.error('Erro ao buscar países:', error);
            return [];
          }  
        return data
    }catch{
        return []
    }

})()