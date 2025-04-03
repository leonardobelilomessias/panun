"use client";
import { useState } from "react";
import { Avatar} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2 } from "lucide-react";
import { supabaseClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import AvatarDefault from '@/public/images/profile/default/avatar-default.jpg';
import { updateUserById } from "@/lib/supabase/queries/server/user";
interface AvatarUploadProps {
  userId: string;
  avatarUrl?: string | null;
  userName: string;
}

export function AvatarUpload({ userId, avatarUrl, userName }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | undefined |null>(avatarUrl);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);

      // Criar um preview da imagem
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Upload para o Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data, error: uploadError } = await supabaseClient().storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obter a URL pública da imagem
      const { data: { publicUrl } } = supabaseClient().storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Atualizar o perfil do usuário com a nova URL do avatar
      await updateUserById({
        id: userId,
        avatar_url: publicUrl
      });

      toast({
        title: "Sucesso!",
        description: "Foto de perfil atualizada com sucesso.",
        variant: "default",
      });

    } catch (error) {
      console.error('Erro ao atualizar avatar:', error);
      toast({
        title: "Erro!",
        description: "Não foi possível atualizar a foto de perfil.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      // Remover o avatar do Supabase Storage
      const filePath = `avatars/${userId}`; // Supondo que o nome do arquivo seja o ID do usuário
      const { error: removeError } = await supabaseClient().storage
        .from('avatars')
        .remove([filePath]);

      if (removeError) {
        throw removeError;
      }

      // Atualizar o perfil do usuário para remover a URL do avatar
      await updateUserById({
        id: userId,
        avatar_url: null // Remover a URL do avatar
      });

      toast({
        title: "Sucesso!",
        description: "Foto de perfil removida com sucesso.",
        variant: "default",
      });

    } catch (error) {
      console.error('Erro ao remover avatar:', error);
      toast({
        title: "Erro!",
        description: "Não foi possível remover a foto de perfil.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-32 w-32">
        <Image 
          width={500} 
          height={500} 
          className='object-cover relative w-full h-full' 
          src={avatarUrl ? avatarUrl : AvatarDefault} 
          alt={userName} 
        />
        </Avatar>
        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 bg-primaryPalet rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 text-white animate-spin" />
          ) : (
            <Camera className="h-4 w-4 text-white" />
          )}
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      </div>
{ avatarUrl &&     <button 
        onClick={handleRemove} 
        className="text-red-500 hover:underline text-sm font-medium"
      >
        Remover Foto
      </button>}
      <p className="text-sm text-muted-foreground">
        Clique no ícone da câmera para alterar sua foto
      </p>
    </div>
  );
}

