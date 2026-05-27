import { useStore } from '@nanostores/preact';
import { useEffect } from 'preact/hooks';
import { cartItems, cartTotal, isCartOpen, closeCart, goToCheckout, loadCart, cartCount, updateQuantity } from '../../store/cartStore';

export default function CartDrawer() {
  const items = useStore(cartItems);
  const total = useStore(cartTotal);
  const count = useStore(cartCount);
  const isOpen = useStore(isCartOpen);

  useEffect(() => {
    loadCart();
  }, []);

  if (!isOpen) return null;

  return (
    <div class="fixed inset-0 z-50 flex justify-end">
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeCart} />
      <div class="relative w-full max-w-md bg-brand-cream shadow-[-8px_0_30px_rgba(0,0,0,0.08)] p-8 overflow-y-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="font-display text-2xl text-brand-blue">Tu Carrito ({count})</h2>
          <button onClick={closeCart} class="p-2 text-brand-blue/60 hover:text-brand-orange transition-colors" aria-label="Cerrar carrito">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div class="text-center py-12">
            <p class="text-brand-blue/50 mb-6">Tu carrito está vacío</p>
            <button onClick={closeCart} class="btn-secondary">
              Seguir Comprando
            </button>
          </div>
        ) : (
          <div class="space-y-6">
            {items.map((item) => (
              <div key={item.id} class="flex gap-4 pb-6 border-b border-brand-blue/10">
                <div class="w-20 h-20 bg-[#F4F2EC] rounded-md overflow-hidden flex-shrink-0">
                  {item.image && <img src={item.image} alt={item.title} class="w-full h-full object-cover" />}
                </div>
                <div class="flex-1">
                  <h3 class="font-display text-brand-blue">{item.title}</h3>
                  <p class="text-sm text-brand-blue/60">${item.price.toFixed(2)}</p>
                  <div class="flex items-center gap-3 mt-2">
                    <div class="flex items-center border border-brand-blue/20 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        class="w-8 h-8 flex items-center justify-center text-brand-blue/60 hover:text-brand-orange transition-colors"
                      >
                        -
                      </button>
                      <span class="w-8 text-center font-display text-brand-blue">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        class="w-8 h-8 flex items-center justify-center text-brand-blue/60 hover:text-brand-orange transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span class="font-display text-lg text-brand-blue">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div class="pt-6 border-t border-brand-blue/15">
              <div class="flex justify-between mb-6">
                <span class="font-accent uppercase text-xs tracking-[0.1em] text-brand-blue/60">Total</span>
                <span class="font-display text-xl text-brand-blue">${total.toFixed(2)}</span>
              </div>
              <button onClick={goToCheckout} class="w-full btn-primary">
                Ir al Checkout
              </button>
              <p class="text-center text-xs text-brand-blue/40 mt-4">
                Pagos seguros con Shopify
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}