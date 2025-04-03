'use client' // Transforma em Client Component
import React from 'react'   
import { useTransition } from 'react'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import { Edit2, EllipsisVertical, Trash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteTip } from '../CreateTipScreen/actions/delete-tip-action'
import {mutate} from 'swr'


export function DropdownCard({ tipId , onDelete}: { tipId: string,onDelete:()=>void }) {
  const [isPending, startTransition] = useTransition()
const {toast} = useToast()
  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTip(tipId)
        onDelete()
        console.log('id a ser deletado', tipId)
        toast({title: 'Dica excluída com sucesso!', })
      } catch (error) {
        console.log(error)
        toast({title: 'Erro ao excluir dica'})
      }
    })
  }

  return (
    <DropdownMenu   >
      <DropdownMenuTrigger  >
        <EllipsisVertical size={20}/>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-44">
        {/* ... Opção Editar ... */}
        
        <Link href={`/dicas/editar-dica/${tipId}`} className='flex hover:bg-gray-100 items-center gap-2 w-44 ' >
        <DropdownMenuItem 
          className='flex items-center gap-2 hover:cursor-pointer'
          
        >
          <Edit2 size={14} />
          <span>
            Editar
          </span>
        </DropdownMenuItem>
          </Link>
        <DropdownMenuItem 
          className='flex items-center gap-2 p-1'
          onSelect={handleDelete}
          disabled={isPending}
        >
          <Trash size={14} />
          <span>
            {isPending ? 'Excluindo...' : 'Excluir'}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}