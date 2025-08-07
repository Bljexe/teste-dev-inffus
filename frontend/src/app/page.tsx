'use client';

import { useState, useEffect } from 'react';
import { useCharacters } from '@/hooks/useCharacters';
import { CharacterFilters as CharacterFiltersType } from '@/types/api';
import { CharacterCard } from '@/components/CharacterCard';
import { CharacterFilters } from '@/components/CharacterFilters';
import { Pagination } from '@/components/Pagination';
import { Button } from '@/components/ui/Button';
import { charactersApi } from '@/services/api';
import { DownloadIcon, RefreshIcon } from '@/components/icons';

export default function HomePage() {
  const [filters, setFilters] = useState<CharacterFiltersType>({
    page: 1,
    per_page: 20,
  });
  const [isImporting, setIsImporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { data, loading, error } = useCharacters(filters);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFiltersChange = (newFilters: CharacterFiltersType) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      per_page: 20,
    });
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleImportCharacters = async () => {
    try {
      setIsImporting(true);
      await charactersApi.importCharacters();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao importar personagens:', error);
    } finally {
      setIsImporting(false);
    }
  };

  const handleSyncCharacters = async () => {
    try {
      setIsSyncing(true);
      await charactersApi.syncCharacters();
      window.location.reload();
    } catch (error) {
      console.error('Erro ao sincronizar personagens:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Erro ao carregar personagens
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Rick and Morty
              </h1>
              <p className="text-gray-600 mt-2">
                Explore o universo de Rick and Morty através dos personagens
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleImportCharacters}
                disabled={isImporting}
                variant="outline"
              >
                <DownloadIcon />
                <span className="ml-2">
                  {isImporting ? 'Importando...' : 'Importar'}
                </span>
              </Button>
              <Button
                onClick={handleSyncCharacters}
                disabled={isSyncing}
                variant="outline"
              >
                <RefreshIcon />
                <span className="ml-2">
                  {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <CharacterFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Characters Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Carregando personagens...</p>
            </div>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {data.data.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
            
            {/* Pagination */}
            {data.pagination && (
              <Pagination
                pagination={data.pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum personagem encontrado
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou importar os personagens primeiro.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
