// Backend-ready service layer for Module Access (Option 2)

const getLocal = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export const moduleAccessService = {
  
  // Add module access
  async add(payload) {
    const list = getLocal("moduleAccess");
    const newItem = { id: Date.now(), ...payload };
    list.push(newItem);
    setLocal("moduleAccess", list);

    return newItem;
    // Django later:
    // return api.post("/module-access/", payload);
  },

  // Update module access
  async update(id, payload) {
    let list = getLocal("moduleAccess");
    list = list.map((item) => (item.id === id ? { ...item, ...payload } : item));
    setLocal("moduleAccess", list);
  },

  // Delete
  async remove(id) {
    let list = getLocal("moduleAccess");
    list = list.filter((i) => i.id !== id);
    setLocal("moduleAccess", list);
  },

  // Get all
  async getAll() {
    return getLocal("moduleAccess");
  },
};
