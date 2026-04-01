import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';
import { useCart } from '../functions/useCart';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useCoupons } from '../functions/useCoupons';
import SEO from '../components/SEO';

function Checkout() {
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce((sum, item) => {
    const numericPrice = Number(item.price.replace(/[^0-9]/g, ''));
    return sum + numericPrice * item.quantity;
  }, 0);

  const {
    couponCode,
    couponStatus,
    appliedCoupon,
    discountMessage,
    discountAmount,
    total,
    applyCoupon,
    handleCouponChange
  } = useCoupons(subtotal);
  
  return (
    <PageContainer gap={16}>
      <SEO 
        title="Finalizar Compra" 
        description="Revisa tu pedido y finaliza tu compra. Katana Gin, pura precisión en tu copa."
        noindex
      />
      <PageTitle uppercase>FINALIZAR COMPRA</PageTitle>
      
      <div className='w-full max-w-2xl mt-8 md:mt-12'>
        <Card className='w-full h-min'>
          <div className='flex flex-col gap-6 md:gap-10 items-start p-5 md:p-12 w-full'>
            <h2 className='text-base font-medium text-muted border-b border-border w-full pb-4'>Detalle del pedido</h2>
            {cartItems.length > 0 ? (
            <div className='w-full flex flex-col gap-4'>
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 sm:gap-6 items-center p-2 border-b border-border/30 last:border-0 pb-4 last:pb-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} loading="lazy" className="w-full h-full object-contain p-2" alt={item.title} />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 items-start">
                    <span className="text-sm font-medium text-primary line-clamp-2 md:line-clamp-1">{item.title}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-primary">Cant: {item.quantity}</span>
                      <span className="text-xs font-semibold text-primary">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center px-1 animate-in fade-in pb-2">
                    <span className="text-sm text-success">
                      Descuento ({appliedCoupon?.type === 'percentage' ? `${appliedCoupon.discount}%` : `$${appliedCoupon?.discount}`})
                    </span>
                    <span className="text-sm font-medium text-success">
                      -${discountAmount.toLocaleString('es-AR')}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm text-primary">Subtotal</span>
                  <span className="text-lg font-medium text-primary">
                    ${total.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
              
              {/* Cupón de descuento */}
              <div className="flex flex-col gap-2 w-full mt-4">
                <div className="flex flex-row items-center gap-2 w-full">
                  <Input 
                    placeholder="Cupón de descuento" 
                    className={`flex-1 min-w-0 ${couponStatus === 'invalid' ? 'border-red-400 focus:border-red-500' : couponStatus === 'valid' ? 'border-success/50 focus:border-success' : ''}`}
                    value={couponCode}
                    onChange={(e) => handleCouponChange(e.target.value)}
                  />
                  <Button 
                    variant={couponCode.trim() ? "primary" : "secondary"} 
                    size="lg" 
                    disabled={!couponCode.trim() || couponStatus === 'valid'}
                    onClick={applyCoupon}
                    icon={couponStatus === 'valid' ? "mdi:check-bold" : "mdi:arrow-right"}
                  />
                </div>
                {couponStatus === 'valid' && (
                  <span className="text-xs font-medium text-success animate-in fade-in slide-in-from-top-1 pl-2">{discountMessage}</span>
                )}
                {couponStatus === 'invalid' && (
                  <span className="text-xs font-medium text-red-500 animate-in fade-in slide-in-from-top-1 pl-2">{discountMessage}</span>
                )}
              </div>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full mt-4" 
                icon="logos:whatsapp-icon"
                onClick={() => window.open('https://wa.me/549342', '_blank', 'noopener,noreferrer')}
              >
                Finalizar por WhatsApp
              </Button>
            </div>
          ) : (
            <div className='flex items-center justify-center h-48 w-full border border-dashed border-gray-300 rounded-2xl text-muted text-sm mt-4'>
              Tu carrito está vacío
            </div>
          )}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

export default Checkout;
