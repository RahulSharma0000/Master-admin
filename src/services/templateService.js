// ---------------------------
// Option-2 LocalStorage Backend
// ---------------------------

const KEY = "documentTemplates";

const getLocal = () => JSON.parse(localStorage.getItem(KEY)) || [];
const setLocal = (data) => localStorage.setItem(KEY, JSON.stringify(data));

export const templateService = {
  getTemplates() {
    return getLocal();
  },

  addTemplate(template) {
    const list = getLocal();
    list.push(template);
    setLocal(list);
    return template;
  },

  updateTemplate(id, updated) {
    const list = getLocal();
    const idx = list.findIndex((t) => t.id === id);
    list[idx] = { ...list[idx], ...updated };
    setLocal(list);
    return list[idx];
  },

  deleteTemplate(id) {
    const updated = getLocal().filter((t) => t.id !== id);
    setLocal(updated);
    return true;
  }
};
