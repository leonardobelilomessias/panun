import React from 'react';
import EditProfile from '@/app/ui/Screens/ProfileScreen/EditProfile';
import { getUserById } from '@/lib/supabase/queries/server/user';

export default async function EditProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id;
  const user = await getUserById(userId);

  if (!user) return <div>Usuário não encontrado.</div>;

  return <EditProfile user={user} />;
}
