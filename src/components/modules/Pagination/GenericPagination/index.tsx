import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export  function GenericPagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Função para calcular o intervalo de páginas visíveis
    const getVisiblePages = () => {
      const visiblePages = [];
      const range = 2; // Quantidade de páginas visíveis ao redor da página atual
  
      let start = Math.max(1, currentPage - range);
      let end = Math.min(totalPages, currentPage + range);
  
      // Ajusta o intervalo para garantir que sempre haja 4 páginas visíveis
      if (currentPage - range < 1) {
        end = Math.min(totalPages, 4);
      }
      if (currentPage + range > totalPages) {
        start = Math.max(1, totalPages - 3);
      }
  
      for (let i = start; i <= end; i++) {
        visiblePages.push(i);
      }
  
      return visiblePages;
    };
  
    return (
      <div className="flex items-center justify-center gap-2 mt-10">
        {/* Botão Anterior */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${currentPage === 1
              ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
              : 'bg-primary-palet text-white hover:bg-blue-600'
            }`}
        >
          Anterior
        </Button>
  
        {/* Números das Páginas */}
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page) => (
            <Button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md ${currentPage === page
                  ? 'bg-primary-palet text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {page}
            </Button>
          ))}
        </div>
  
        {/* Botão Próximo */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${currentPage === totalPages
              ? 'bg-gray-200 text-gray-700 cursor-not-allowed'
              : 'bg-primary-palet text-white hover:bg-blue-600'
            }`}
        >
          Próximo
        </Button>
      </div>
    );
  }