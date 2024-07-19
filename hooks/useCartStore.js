import { create } from "zustand";

const useCartStore = create((set) => ({
  products: [],
  addProduct: (productId, count) =>
    set((state) => ({
      products: [...state.products, { productId, count }],
    })),
  increaseQuantity: (productId) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, count: product.count + 1 }
          : product,
      ),
    })),
  decreaseQuantity: (productId) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, count: product.count - 1 }
          : product,
      ),
    })),
  removeProduct: (productId) =>
    set((state) => ({
      products: state.products.filter((prod) => prod.productId !== productId),
    })),
}));

export default useCartStore;
