export interface Character {
  id: number;
  external_id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'Unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'Unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created_at_external: string;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface CharactersResponse {
  success: boolean;
  data: Character[];
  pagination: Pagination;
}

export interface CharacterResponse {
  success: boolean;
  data: Character;
}

export interface StatsOverview {
  total_characters: number;
  by_status: Array<{
    status: string;
    count: number;
  }>;
  by_species: Array<{
    species: string;
    count: number;
  }>;
  by_gender: Array<{
    gender: string;
    count: number;
  }>;
}

export interface StatsResponse {
  success: boolean;
  data: StatsOverview;
}

export interface SyncResponse {
  success: boolean;
  message: string;
  total: number;
}

export interface CharacterFilters {
  page?: number;
  per_page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  type?: string;
} 