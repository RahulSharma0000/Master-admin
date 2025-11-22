// -----------------------------------------
// Option 2 - LocalStorage backend (Django Ready)
// -----------------------------------------

const KEY = "interest_settings";

const getLocal = () => JSON.parse(localStorage.getItem(KEY)) || {};
const setLocal = (data) => localStorage.setItem(KEY, JSON.stringify(data));

export const interestService = {
  // GET settings
  getSettings() {
    return getLocal();
  },

  // SAVE main settings
  saveSettings(data) {
    const existing = getLocal();
    const updated = { ...existing, ...data };
    setLocal(updated);
    return updated;
  },

  // ADD ROI Slab
  addRoiSlab(slab) {
    const data = getLocal();
    const slabs = data.roiSlabs || [];
    slabs.push({ id: Date.now(), ...slab });
    setLocal({ ...data, roiSlabs: slabs });
    return slabs;
  },

  // DELETE ROI Slab
  deleteRoiSlab(id) {
    const data = getLocal();
    const updated = (data.roiSlabs || []).filter((s) => s.id !== id);
    setLocal({ ...data, roiSlabs: updated });
    return updated;
  }
};
