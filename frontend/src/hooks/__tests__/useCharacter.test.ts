import { renderHook, waitFor } from '@testing-library/react';
import { useCharacter } from '../useCharacter';
import { charactersApi } from '@/services/api';
import { CharacterResponse } from '@/types/api';

jest.mock('@/services/api', () => ({
  charactersApi: {
    getCharacter: jest.fn(),
  },
}));

const mockCharactersApi = charactersApi as jest.Mocked<typeof charactersApi>;

const mockCharacterResponse: CharacterResponse = {
  success: true,
  data: {
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
};

describe('useCharacter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve carregar um personagem com sucesso', async () => {
    mockCharactersApi.getCharacter.mockResolvedValue(mockCharacterResponse);

    const { result } = renderHook(() => useCharacter(1));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockCharacterResponse);
    expect(result.current.error).toBe(null);
  });

  it('deve lidar com erro ao carregar personagem', async () => {
    const errorMessage = 'Erro na requisição';
    mockCharactersApi.getCharacter.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useCharacter(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.data).toBe(null);
  });

  it('não deve fazer requisição quando o ID é undefined', () => {
    const { result } = renderHook(() => useCharacter(undefined));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(mockCharactersApi.getCharacter).not.toHaveBeenCalled();
  });

  it('não deve fazer requisição quando o ID é null', () => {
    const { result } = renderHook(() => useCharacter(null));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(mockCharactersApi.getCharacter).not.toHaveBeenCalled();
  });
});
