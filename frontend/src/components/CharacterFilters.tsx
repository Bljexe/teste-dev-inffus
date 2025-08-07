import { CharacterFilters } from '@/types/api';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { SearchIcon, XIcon } from '@/components/icons';

interface CharacterFiltersProps {
  filters: CharacterFilters;
  onFiltersChange: (filters: CharacterFilters) => void;
  onClearFilters: () => void;
}

export function CharacterFilters({ filters, onFiltersChange, onClearFilters }: CharacterFiltersProps) {
  const handleFilterChange = (key: keyof CharacterFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
      page: 1, // Reset to first page when filters change
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <XIcon />
          <span className="ml-1">Limpar</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <Input
            placeholder="Buscar por nome..."
            value={filters.name || ''}
            onChange={(e) => handleFilterChange('name', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <Select
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Todos</option>
            <option value="alive">Vivo</option>
            <option value="dead">Morto</option>
            <option value="unknown">Desconhecido</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Espécie
          </label>
          <Input
            placeholder="Ex: Human, Alien..."
            value={filters.species || ''}
            onChange={(e) => handleFilterChange('species', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gênero
          </label>
          <Select
            value={filters.gender || ''}
            onChange={(e) => handleFilterChange('gender', e.target.value)}
          >
            <option value="">Todos</option>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sem gênero</option>
            <option value="unknown">Desconhecido</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <Input
            placeholder="Ex: Human with antennae..."
            value={filters.type || ''}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Por página
          </label>
          <Select
            value={filters.per_page?.toString() || '20'}
            onChange={(e) => handleFilterChange('per_page', e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </Select>
        </div>
      </div>
    </div>
  );
} 