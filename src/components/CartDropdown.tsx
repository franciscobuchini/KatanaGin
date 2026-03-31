import Button from './Button';
import Badge from './Badge';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartDropdownProps {
  isVisible: boolean;
  cartItems: CartItem[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onClose?: () => void;
}

export default function CartDropdown({ isVisible, cartItems, onIncrease, onDecrease, onClose }: CartDropdownProps) {
  const navigate = useNavigate();

  if (!isVisible) return null;

  return (
    <div className="absolute top-full right-[-1rem] md:right-0 mt-4 w-[calc(100vw-2rem)] md:w-96 bg-white/95 backdrop-blur-2xl border border-border shadow-2xl rounded-3xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
      
      {/* Header */}
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <h3 className="font-semibold text-primary">Tu Carrito</h3>
        <Badge variant="primary" size="xs">
          {cartItems.length} productos
        </Badge>
      </div>

      {/* Lista */}
      <div className="max-h-80 overflow-y-auto p-4 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 items-center group/item p-2 hover:bg-gray-50 rounded-2xl transition-colors">
            <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
              <img src={item.image} loading="lazy" className="w-full h-full object-contain p-2" alt={item.title} />
            </div>
            <div className="flex-1 flex flex-col gap-1 items-start">
              <span className="text-sm font-medium text-primary line-clamp-1">{item.title}</span>
              <div className="flex items-center gap-1">
                <span className="text-xs text-primary">Cant: {item.quantity}</span>
                <span className="text-xs font-semibold text-primary">{item.price}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="secondary" 
                size="sm" 
                icon="mdi:minus"
                onClick={() => onDecrease(item.id)}
              />
              <Button 
                variant="secondary" 
                size="sm" 
                icon="mdi:plus"
                onClick={() => onIncrease(item.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50/50 border-t border-border/50 flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <span className="text-sm text-muted">Subtotal</span>
          <span className="text-lg font-bold text-primary">
            ${cartItems
              .reduce((sum, item) => {
                const numericPrice = Number(item.price.replace(/[^0-9]/g, ''));
                return sum + numericPrice * item.quantity;
              }, 0)
              .toLocaleString('es-AR')}
          </span>
        </div>
        <Button 
          variant="primary" 
          className="w-full"
          onClick={() => {
            if (onClose) onClose();
            navigate('/checkout');
          }}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}
