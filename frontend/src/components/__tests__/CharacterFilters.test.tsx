import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterFilters } from '../CharacterFilters';
import { CharacterFilters as CharacterFiltersType } from '@/types/api';

const mockFilters: CharacterFiltersType = {
  page: 1,
  per_page: 20,
  name: '',
  status: '',
  species: '',
  gender: '',
  type: '',
};

const mockOnFiltersChange = jest.fn();
const mockOnClearFilters = jest.fn();

describe('CharacterFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar todos os campos de filtro', () => {
    render(
      <CharacterFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    expect(screen.getByPlaceholderText('Buscar por nome...')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Espécie')).toBeInTheDocument();
    expect(screen.getByText('Gênero')).toBeInTheDocument();
    expect(screen.getByText('Tipo')).toBeInTheDocument();
  });

  it('deve chamar onFiltersChange quando o nome é alterado', () => {
    render(
      <CharacterFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const nameInput = screen.getByPlaceholderText('Buscar por nome...');
    fireEvent.change(nameInput, { target: { value: 'Rick' } });

    expect(mockOnFiltersChange).toHaveBeenCalledWith({
      ...mockFilters,
      name: 'Rick',
      page: 1,
    });
  });

  it('deve chamar onClearFilters quando o botão limpar é clicado', () => {
    render(
      <CharacterFilters
        filters={mockFilters}
        onFiltersChange={mockOnFiltersChange}
        onClearFilters={mockOnClearFilters}
      />
    );

    const clearButton = screen.getByText('Limpar');
    fireEvent.click(clearButton);

    expect(mockOnClearFilters).toHaveBeenCalled();
  });
});
