import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination';
import { Pagination as PaginationType } from '@/types/api';

const mockPagination: PaginationType = {
  current_page: 1,
  last_page: 10,
  per_page: 20,
  total: 200,
  from: 1,
  to: 20,
};

const mockOnPageChange = jest.fn();

describe('Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar as informações de paginação', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText(/Mostrando/)).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
  });

  it('deve renderizar os botões de navegação', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText('Anterior')).toBeInTheDocument();
    expect(screen.getByText('Próxima')).toBeInTheDocument();
  });

  it('deve chamar onPageChange quando uma página é clicada', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });
});
