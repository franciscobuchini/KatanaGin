import PageContainer from '../components/PageContainer';
import PageTitle from '../components/PageTitle';
import { useCart } from '../functions/useCart';
import Card from '../components/Card';

function Checkout() {
  const { cartItems } = useCart();
  return (
    <PageContainer gap={16}>
      <PageTitle uppercase>FINALIZAR COMPRA</PageTitle>
      
      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12'>
        <Card className='lg:col-span-2 h-min'>
          <div className='flex flex-col gap-10 items-start p-8 md:p-12 w-full'>
            <h2 className='text-xs font-bold uppercase tracking-widest text-muted border-b border-border w-full pb-4'>Detalle del pedido</h2>
            {cartItems.length > 0 ? (
            <div className='w-full flex flex-col gap-4'>
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center p-2 border-b border-border/30 last:border-0 pb-4 last:pb-2">
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
                </div>
              ))}
              <div className="flex justify-between items-center px-1 mt-2 pt-2">
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
            </div>
          ) : (
            <div className='flex items-center justify-center h-48 w-full border border-dashed border-gray-300 rounded-2xl text-muted text-sm mt-4'>
              Tu carrito está vacío
            </div>
          )}
          </div>
        </Card>

        <Card className='lg:col-span-3 h-min'>
          <div className='flex flex-col gap-10 items-start p-8 md:p-12 w-full'>
            <h2 className='text-xs font-bold uppercase tracking-widest text-muted border-b border-border w-full pb-4'>Información de pago</h2>
            <div className='w-full flex-col gap-6 flex mt-4 border border-dashed border-gray-300 rounded-2xl h-80 p-12 items-center justify-center gap-12 text-sm text-muted'>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

export default Checkout;
