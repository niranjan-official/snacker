import { create } from "zustand";

const getCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const saveCartToLocalStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const useSnackerStore = create((set) => ({
  products: getCartFromLocalStorage(),
  credit: 0,
  openCreditWallet: false,

  setOpenCreditWallet: (value) => set({ openCreditWallet: value }),
  setCredit: (newCredit) => set({ credit: newCredit }),
  updateCredit: (amount) => set((state) => ({ credit: state.credit + amount })),

  addProduct: (productId, count, price, name, position, subtitle) =>
    set((state) => {
      const existingProduct = state.products.find(
        (product) => product.productId === productId,
      );
      let updatedProducts;

      if (existingProduct) {
        updatedProducts = state.products.map((product) =>
          product.productId === productId
            ? { ...product, count: product.count + count }
            : product,
        );
      } else {
        updatedProducts = [
          ...state.products,
          { productId, count, price, name, position, subtitle },
        ];
      }

      saveCartToLocalStorage(updatedProducts);
      return { products: updatedProducts };
    }),

  increaseQuantity: (productId, stock) =>
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.productId === productId
          ? { ...product, count: Math.min(product.count + 1, stock) }
          : product,
      );

      saveCartToLocalStorage(updatedProducts);
      return { products: updatedProducts };
    }),

  decreaseQuantity: (productId) =>
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.productId === productId
          ? { ...product, count: Math.max(product.count - 1, 1) }
          : product,
      );

      saveCartToLocalStorage(updatedProducts);
      return { products: updatedProducts };
    }),

  removeProduct: (productId) =>
    set((state) => {
      const updatedProducts = state.products.filter(
        (product) => product.productId !== productId,
      );

      saveCartToLocalStorage(updatedProducts);
      return { products: updatedProducts };
    }),
  removeAll: () =>
    set((state) => {
      const updatedProducts = [];
      saveCartToLocalStorage(updatedProducts);
      return { products: updatedProducts };
    }),
}));

export default useSnackerStore;
