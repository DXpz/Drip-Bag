import { atom, computed } from 'nanostores';

export interface CartItem {
  id: string;
  variantId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export const cartItems = atom<CartItem[]>([]);
export const isCartOpen = atom(false);

export const cartCount = computed(cartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartTotal = computed(cartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export function addToCart(item: Omit<CartItem, 'quantity'>) {
  const current = cartItems.get();
  const existing = current.find((i) => i.variantId === item.variantId);

  if (existing) {
    cartItems.set(
      current.map((i) =>
        i.variantId === item.variantId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  } else {
    cartItems.set([...current, { ...item, quantity: 1 }]);
  }
}

export function removeFromCart(variantId: string) {
  cartItems.set(cartItems.get().filter((i) => i.variantId !== variantId));
}

export function updateQuantity(variantId: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(variantId);
    return;
  }
  cartItems.set(
    cartItems.get().map((i) =>
      i.variantId === variantId ? { ...i, quantity } : i
    )
  );
}

export function clearCart() {
  cartItems.set([]);
}

export function openCart() {
  isCartOpen.set(true);
}

export function closeCart() {
  isCartOpen.set(false);
}