import { useStore } from '@nanostores/preact';
import { addToCart, openCart } from '../../store/cartStore';
import type { Product } from '../../utils/shopify';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const image = product.images.edges[0]?.node;
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const firstVariant = product.variants.edges[0]?.node;

  const handleAddToCart = () => {
    if (!firstVariant) return;
    addToCart({
      id: product.id,
      variantId: firstVariant.id,
      title: product.title,
      price,
      image: image?.url,
    });
    openCart();
  };

  return (
    <div class="bg-transparent group cursor-pointer">
      <div class="bg-[#F4F2EC] overflow-hidden rounded-md mb-4">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            class="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div class="w-full aspect-square flex items-center justify-center text-brand-blue/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="w-16 h-16">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        )}
      </div>
      <h3 class="font-display text-lg text-brand-blue mb-1 group-hover:text-brand-orange transition-colors">
        {product.title}
      </h3>
      <p class="font-accent text-sm text-brand-blue/60 mb-3">
        ${price.toFixed(2)} {product.priceRange.minVariantPrice.currencyCode}
      </p>
      <button
        onClick={handleAddToCart}
        class="btn-secondary w-full"
        disabled={!firstVariant?.availableForSale}
      >
        {!firstVariant?.availableForSale ? 'Agotado' : 'Añadir al Carrito'}
      </button>
    </div>
  );
}