import { renderHook, waitFor } from '@testing-library/react';
import { useCharacters } from '../useCharacters';
import { charactersApi } from '@/services/api';
import { CharactersResponse } from '@/types/api';

jest.mock('@/services/api', () => ({
  charactersApi: {
    getCharacters: jest.fn(),
  },
}));

const mockCharactersApi = charactersApi as jest.Mocked<typeof charactersApi>;

const mockCharactersResponse: CharactersResponse = {
  success: true,
  data: [
    {
      id: 1,
      external_id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: 'https://example.com' },
      location: { name: 'Earth', url: 'https://example.com' },
      image: 'https://example.com/rick.jpg',
      episode: ['https://example.com/episode1'],
      url: 'https://example.com/character1',
      created_at_external: '2017-11-04T18:48:46.250Z',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z',
    },
  ],
  pagination: {
    current_page: 1,
    last_page: 10,
    per_page: 20,
    total: 200,
    from: 1,
    to: 20,
  },
};

describe('useCharacters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve carregar personagens com sucesso', async () => {
    mockCharactersApi.getCharacters.mockResolvedValue(mockCharactersResponse);

    const { result } = renderHook(() => useCharacters());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockCharactersResponse);
    expect(result.current.error).toBe(null);
  });

  it('deve lidar com erro ao carregar personagens', async () => {
    const errorMessage = 'Erro na requisição';
    mockCharactersApi.getCharacters.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toBe(null);
  });

  it('deve carregar personagens com filtros', async () => {
    mockCharactersApi.getCharacters.mockResolvedValue(mockCharactersResponse);

    const filters = { name: 'Rick', status: 'alive' };
    const { result } = renderHook(() => useCharacters(filters));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockCharactersApi.getCharacters).toHaveBeenCalledWith(filters);
  });
});
