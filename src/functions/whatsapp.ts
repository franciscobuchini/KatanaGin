import type { CartItem } from './CartContext';

interface WhatsAppMessageParams {
  cartItems: CartItem[];
  subtotal: number;
  discountAmount: number;
  total: number;
}

export const generateWhatsAppMessage = ({
  cartItems,
  subtotal,
  discountAmount,
  total
}: WhatsAppMessageParams) => {
  const itemsText = cartItems
    .map(item => `- ${item.quantity}x ${item.title}: ${item.price}`)
    .join('\n');
  
  const discountText = discountAmount > 0 
    ? `\nDescuento: -$${discountAmount.toLocaleString('es-AR')}` 
    : '';
    
  const message = `Hola Katana Gin! Quisiera realizar el siguiente pedido:\n\n${itemsText}\n\nSubtotal: $${subtotal.toLocaleString('es-AR')}${discountText}\nTotal: $${total.toLocaleString('es-AR')}`;
  
  return encodeURIComponent(message);
};
