'use client';

import { useState, useEffect } from 'react';
import { getProfileById } from '@/lib/supabase/queries/profilesClient';
import { IProfile } from '@/app/types/TypesDB';

interface UseProfileProps {
  userId: string;
}

export const useProfile = ({ userId }: UseProfileProps) => {
  const [profile, setProfile] = useState<IProfile | null| any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileById(userId);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar perfil'));
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return { profile, isLoading, error };
}; 