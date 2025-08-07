import { Pagination as PaginationType } from '@/types/api';
import { Button } from '@/components/ui/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { current_page, last_page, total, from, to } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (last_page <= maxVisible) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      if (current_page <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(last_page);
      } else if (current_page >= last_page - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = last_page - 3; i <= last_page; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = current_page - 1; i <= current_page + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(last_page);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex items-center text-sm text-gray-700">
        <span>
          Mostrando <span className="font-medium">{from}</span> a{' '}
          <span className="font-medium">{to}</span> de{' '}
          <span className="font-medium">{total}</span> resultados
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
        >
          <ChevronLeftIcon />
          <span className="ml-1">Anterior</span>
        </Button>
        
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-gray-500">...</span>
              ) : (
                <Button
                  variant={current_page === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
        >
          <span className="mr-1">Próxima</span>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
} 