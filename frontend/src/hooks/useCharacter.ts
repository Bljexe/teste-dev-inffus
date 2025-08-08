import { useState, useEffect } from 'react';
import { charactersApi } from '@/services/api';
import { CharacterResponse } from '@/types/api';

export const useCharacter = (id: number | undefined | null) => {
  const [data, setData] = useState<CharacterResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) {
        setLoading(false);
        setData(null);
        setError(null);
        return;
      }

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

    fetchCharacter();
  }, [id]);

  return { data, loading, error };
}; 