import { useState, useEffect } from 'react';
import { charactersApi } from '@/services/api';
import { CharactersResponse, CharacterFilters } from '@/types/api';

export const useCharacters = (filters: CharacterFilters = {}) => {
  const [data, setData] = useState<CharactersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await charactersApi.getCharacters(filters);
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar personagens');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [filters]);

  return { data, loading, error };
}; 