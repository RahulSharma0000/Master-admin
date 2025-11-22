// -------------------------------------
// Option 2 Backend (LocalStorage now → Django Ready)
// -------------------------------------

const KEY = "loanProducts";

const getLocal = () => JSON.parse(localStorage.getItem(KEY)) || [];
const setLocal = (data) => localStorage.setItem(KEY, JSON.stringify(data));

export const loanProductService = {
  // Get all products
  getProducts() {
    return getLocal();
    // Django later:
    // return api.get("/loan-products/");
  },

  // Add product
  addProduct(name) {
    const all = getLocal();

    const newItem = {
      id: Date.now(),
      name: name.trim(),
      createdAt: new Date().toISOString(),
    };

    all.push(newItem);
    setLocal(all);

    return newItem;
  },

  // Update product
  updateProduct(id, name) {
    const all = getLocal();
    const updated = all.map((p) =>
      p.id === id ? { ...p, name: name.trim() } : p
    );
    setLocal(updated);
    return true;
  },

  // Delete product
  deleteProduct(id) {
    const updated = getLocal().filter((p) => p.id !== id);
    setLocal(updated);
    return true;
  },
};
