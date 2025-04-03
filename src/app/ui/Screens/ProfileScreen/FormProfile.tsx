"use client"
import { FC, useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useRouter } from "next/navigation";
import { Pencil, Save } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "@/components/ui/use-toast";
import { updateProfileById } from '@/lib/supabase/queries/profilesClient';
import { ptBR } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';
import { IProfile } from '@/app/types/TypesDB';
import { updateUserById } from '@/lib/supabase/queries/server/user';
registerLocale('pt-BR', ptBR);

const profileFormSchema = z.object({
  id: z.string(),
  user_name: z.string().min(3, 'Nome de usuário deve ter no mínimo 3 caracteres'),
  full_name: z.string().min(3, 'Nome completo deve ter no mínimo 3 caracteres'),
  bio: z.string().optional(),
  origem: z.string().optional(),
  current_in: z.string().optional()
});

interface FormProfileProps {
  userId: string;
  initialData: IProfile;
}

interface ProfileFormData {
  id: string;
  user_name: string;
  full_name: string;
  bio?: string;
  origem?: string;
  current_in?: string;
  
}

export const FormProfile: FC<FormProfileProps> = ({ userId, initialData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // Certifique-se de que o hook useForm é sempre chamado
  const formMethods = useForm<any>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      id: userId,
      user_name: initialData.user_name || '',
      full_name: initialData.full_name || '',
      bio: initialData.bio || '',
      origem: initialData.origem || '',
      current_in: initialData.current_in || ''
    }
  });

  const { register, handleSubmit, formState: { errors } } = formMethods;

  const onSubmit = async (data: IProfile) => {
    try {
      setIsSubmitting(true);
      await updateUserById(data);
      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!",
      });
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar perfil",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <p className="font-bold text-xl mb-3">Dados Pessoais</p>
        <Button className="bg-primaryPalet" onClick={() => setIsEditing(true)}>
          <Pencil size={16} className="mx-1" /> Editar Perfil
        </Button>
      </div>

      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={formMethods.control}
            name="user_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Nome de Usuário</FormLabel>
                <FormControl>
                  <Input disabled={!isEditing} placeholder="Digite o nome de usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Nome Completo</FormLabel>
                <FormControl>
                  <Input disabled={!isEditing} placeholder="Digite o nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Biografia</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={!isEditing}
                    placeholder="Conte um pouco sobre você..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="origem"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Origem</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isEditing}
                    placeholder="Cidade/Estado de origem"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formMethods.control}
            name="current_in"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Localização Atual</FormLabel>
                <FormControl>
                  <Input
                    disabled={!isEditing}
                    placeholder="Onde você está morando atualmente"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="py-4">
            <Button 
              disabled={!isEditing || isSubmitting} 
              className="flex bg-primaryPalet hover:bg-blue-600" 
              type="submit"
            >
              <Save className="mr-2" /> Salvar
            </Button>
          </div>
        </form>
      </Form>

      <div suppressHydrationWarning>
        {/* Conteúdo que pode variar entre servidor e cliente */}
        {new Date().toLocaleTimeString()}
      </div>
    </>
  );
}