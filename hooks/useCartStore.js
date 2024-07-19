import { create } from 'zustand';

const getCartFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const saveCartToLocalStorage = (cart) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

const useCartStore = create((set) => ({
  products: getCartFromLocalStorage(),

  addProduct: (productId, count, price) => set((state) => {
    const existingProduct = state.products.find((product) => product.productId === productId);
    let updatedProducts;

    if (existingProduct) {
      updatedProducts = state.products.map((product) =>
        product.productId === productId
          ? { ...product, count: product.count + count }
          : product
      );
    } else {
      updatedProducts = [...state.products, { productId, count, price }];
    }

    saveCartToLocalStorage(updatedProducts);
    return { products: updatedProducts };
  }),

  increaseQuantity: (productId) => set((state) => {
    const updatedProducts = state.products.map((product) =>
      product.productId === productId
        ? { ...product, count: product.count + 1 }
        : product
    );

    saveCartToLocalStorage(updatedProducts);
    return { products: updatedProducts };
  }),

  decreaseQuantity: (productId) => set((state) => {
    const updatedProducts = state.products.map((product) =>
      product.productId === productId
        ? { ...product, count: Math.max(product.count - 1, 1) } 
        : product
    );

    saveCartToLocalStorage(updatedProducts);
    return { products: updatedProducts };
  }),

  removeProduct: (productId) => set((state) => {
    const updatedProducts = state.products.filter((product) => product.productId !== productId);

    saveCartToLocalStorage(updatedProducts);
    return { products: updatedProducts };
  }),
}));

export default useCartStore;