import { useStore } from '@nanostores/preact';
import { cartItems, cartTotal, isCartOpen, closeCart, removeFromCart, updateQuantity } from '../../store/cartStore';
import type { CartItem } from '../../store/cartStore';

export default function CartDrawer() {
  const items = useStore(cartItems);
  const total = useStore(cartTotal);
  const isOpen = useStore(isCartOpen);

  if (!isOpen) return null;

  return (
    <div class="fixed inset-0 z-50 flex justify-end">
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={closeCart} />
      <div class="relative w-full max-w-md bg-brand-cream shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 overflow-y-auto">
        <div class="flex items-center justify-between mb-8">
          <h2 class="font-display text-2xl text-brand-blue">Tu Carrito</h2>
          <button onClick={closeCart} class="p-2 text-brand-blue/60 hover:text-brand-orange transition-colors" aria-label="Cerrar carrito">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <p class="text-brand-blue/50 text-center py-12">Tu carrito está vacío</p>
        ) : (
          <div class="space-y-6">
            {items.map((item: CartItem) => (
              <div key={item.variantId} class="flex gap-4 pb-6 border-b border-brand-blue/10">
                <div class="w-20 h-20 bg-[#F4F2EC] rounded-md overflow-hidden flex-shrink-0">
                  {item.image && <img src={item.image} alt={item.title} class="w-full h-full object-cover" />}
                </div>
                <div class="flex-1">
                  <h3 class="font-display text-brand-blue">{item.title}</h3>
                  <p class="text-sm text-brand-blue/60">${item.price.toFixed(2)}</p>
                  <div class="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      class="w-7 h-7 rounded-full border border-brand-blue/20 flex items-center justify-center text-brand-blue/60 hover:border-brand-orange hover:text-brand-orange transition-colors"
                    >
                      −
                    </button>
                    <span class="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      class="w-7 h-7 rounded-full border border-brand-blue/20 flex items-center justify-center text-brand-blue/60 hover:border-brand-orange hover:text-brand-orange transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.variantId)}
                      class="ml-auto text-xs text-brand-blue/40 hover:text-red-500 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div class="pt-6 border-t border-brand-blue/15">
              <div class="flex justify-between mb-6">
                <span class="font-accent uppercase text-xs tracking-[0.1em] text-brand-blue/60">Total</span>
                <span class="font-display text-xl text-brand-blue">${total.toFixed(2)}</span>
              </div>
              <button class="w-full btn-primary">Proceder al Pago</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}