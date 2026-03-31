import { useState } from 'react';
import Button from './Button';
import Badge from './Badge';
import { useCart } from '../functions/useCart';

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
  image: string;
  detail?: string;
  isAvailable?: boolean;
}

export default function ProductCard({ id, title, price, image, detail, isAvailable = true }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, title, price, image, detail });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className={`group flex flex-col border border-border rounded-3xl overflow-hidden bg-white transition-all duration-500 ${isAvailable ? '' : 'grayscale-[1]'}`}>
      
      {/* Área del Producto con gradiente sutil */}
      <div className={`aspect-square flex items-center justify-center p-6 overflow-hidden relative ${isAvailable ? 'bg-gradient-to-tr from-accent/15 to-transparent bg-white' : 'bg-white'}`}>
        <img 
          src={image} 
          alt={title} 
          loading="lazy"
          className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 ${isAvailable ? '' : 'opacity-50'}`} 
        />
      </div>
      
      {/* Área de Características simplificada */}
      <div className='p-6 flex items-center justify-between gap-3 bg-white border-t border-border'>
        
        {/* Información Básica */}
        <div className='flex flex-col overflow-hidden'>
          <h3 className='flex items-baseline gap-2 text-sm md:text-base font-medium text-primary tracking-tight leading-normal'>
            <span className="truncate">{title}</span>
            {detail && <span className='font-normal text-gray-400 text-xs shrink-0'>{detail}</span>}
          </h3>
          <span className='text-lg text-accent font-medium'>
            {price}
          </span>
        </div>
        
        {/* Acciones */}
        {isAvailable ? (
          <Button 
            variant={isAdded ? "success" : "primary"} 
            icon={isAdded ? "mdi:check" : "mdi:plus"}
            size='md'
            onClick={handleAddToCart}
          />
        ) : (
          <Badge variant="primary" size="xs">
            Sin stock
          </Badge>
        )}
      </div>
    </div>
  );
}

