import axios from 'axios';
import { 
  CharactersResponse, 
  CharacterResponse, 
  StatsResponse, 
  SyncResponse,
  CharacterFilters 
} from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const charactersApi = {
  // Listar personagens com filtros
  getCharacters: async (filters: CharacterFilters = {}): Promise<CharactersResponse> => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/api/characters?${params.toString()}`);
    return response.data;
  },

  // Buscar personagem por ID
  getCharacter: async (id: number): Promise<CharacterResponse> => {
    const response = await api.get(`/api/characters/${id}`);
    return response.data;
  },

  // Obter estatísticas
  getStats: async (): Promise<StatsResponse> => {
    const response = await api.get('/api/characters/stats/overview');
    return response.data;
  },

  // Importar personagens
  importCharacters: async (): Promise<SyncResponse> => {
    const response = await api.post('/api/sync/characters');
    return response.data;
  },

  // Sincronizar dados
  syncCharacters: async (): Promise<SyncResponse> => {
    const response = await api.post('/api/sync/characters/update');
    return response.data;
  },
}; 