import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { deleteLeadById } from "@/lib/supabase/queries/client/leads/deleteLeadsById"


interface DialogToDeleteLeadProps {
  idLead: string
  reloadList: () => void
}

export function DialogToDeleteLead({ idLead, reloadList }: DialogToDeleteLeadProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  async function handleDelete() {
    setIsDeleting(true)
    try {
      const response = await deleteLeadById(idLead)
      if (response.error) {
        toast({
          title: "Erro ao excluir",
          description: response.error.message,
          variant: "destructive",
        })
        return
      }
      toast({
        title: "Lead excluído",
        description: "O lead foi excluído com sucesso.",
      })
      reloadList()
      setOpen(false)
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao tentar excluir o lead.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Trash2 size={16} className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excluir Lead</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir este lead? Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Excluindo...
              </>
            ) : (
              "Excluir Lead"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}