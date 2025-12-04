import { useCartStore } from "../store/cart.store";

/**
 * Hook to access and manipulate cart state
 * Provides convenient access to cart store methods and computed values
 */
export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  // Compute values directly from items to ensure proper Zustand subscription tracking
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.discountPercentage
      ? item.product.price * (1 - item.product.discountPercentage / 100)
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isEmpty: items.length === 0,
  };
}
