
import { PackageX } from 'lucide-react';

export const NoProductsFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-96 w-full text-center">
            <PackageX className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="sm:text-2xl text-lg font-semibold text-gray-700 mb-2 ">No se encontraron productos</h2>
            <p className="lg:text-lg sm:text-base text-sm text-gray-500">Intenta ajustar tus filtros o términos de búsqueda</p>
        </div>
    );
}