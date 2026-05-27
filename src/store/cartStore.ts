import { atom } from 'nanostores';
import { createCart, addToCart as shopifyAddToCart, getCart, type Cart } from '../utils/shopify';

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
export const checkoutUrl = atom<string>('');
export const cartId = atom<string | null>(null);
export const isLoading = atom(false);

export const cartCount = atom(0);
export const cartTotal = atom(0);

export async function addToCartItem(item: Omit<CartItem, 'quantity'>) {
  isLoading.set(true);

  try {
    let cid = cartId.get();
    let cart: Cart | null = null;

    if (!cid) {
      cart = await createCart(item.variantId, 1);
      if (cart) {
        cartId.set(cart.id);
        checkoutUrl.set(cart.checkoutUrl);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('shopify_cart_id', cart.id);
          localStorage.setItem('shopify_checkout_url', cart.checkoutUrl);
        }
      }
    } else {
      cart = await shopifyAddToCart(cid, item.variantId, 1);
    }

    if (cart) {
      const items: CartItem[] = cart.lines.edges.map((edge: { node: { id: string; quantity: number; merchandise: { id: string; title: string; product: { title: string }; priceV2: { amount: string }; image?: { url: string } } }) => ({
        id: edge.node.id,
        variantId: edge.node.merchandise.id,
        title: edge.node.merchandise.product.title,
        price: parseFloat(edge.node.merchandise.priceV2.amount),
        quantity: edge.node.quantity,
        image: edge.node.merchandise.image?.url,
      }));

      cartItems.set(items);
      cartCount.set(items.reduce((sum, i) => sum + i.quantity, 0));
      cartTotal.set(items.reduce((sum, i) => sum + i.price * i.quantity, 0));
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  } finally {
    isLoading.set(false);
  }
}

export async function loadCart() {
  if (typeof localStorage === 'undefined') return;

  const storedCartId = localStorage.getItem('shopify_cart_id');
  if (!storedCartId) return;

  isLoading.set(true);
  try {
    const cart = await getCart(storedCartId);
    if (cart) {
      cartId.set(cart.id);
      checkoutUrl.set(cart.checkoutUrl);

      const items: CartItem[] = cart.lines.edges.map((edge: { node: { id: string; quantity: number; merchandise: { id: string; title: string; product: { title: string }; priceV2: { amount: string }; image?: { url: string } } }) => ({
        id: edge.node.id,
        variantId: edge.node.merchandise.id,
        title: edge.node.merchandise.product.title,
        price: parseFloat(edge.node.merchandise.priceV2.amount),
        quantity: edge.node.quantity,
        image: edge.node.merchandise.image?.url,
      }));

      cartItems.set(items);
      cartCount.set(items.reduce((sum, i) => sum + i.quantity, 0));
      cartTotal.set(items.reduce((sum, i) => sum + i.price * i.quantity, 0));
    }
  } catch (error) {
    console.error('Error loading cart:', error);
  } finally {
    isLoading.set(false);
  }
}

export function openCart() {
  isCartOpen.set(true);
}

export function closeCart() {
  isCartOpen.set(false);
}

export function goToCheckout() {
  const url = checkoutUrl.get();
  if (url) {
    window.location.href = url;
  }
}