import { useState, useEffect } from 'react';
import { charactersApi } from '@/services/api';
import { CharacterResponse } from '@/types/api';

export const useCharacter = (id: number) => {
  const [data, setData] = useState<CharacterResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await charactersApi.getCharacter(id);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar personagem');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  return { data, loading, error };
}; 