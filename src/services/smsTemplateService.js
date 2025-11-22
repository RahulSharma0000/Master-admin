// src/services/smsTemplateService.js
// ---------------------------------------------------------
// Option 2: LocalStorage now → Easy switch to Django later
// ---------------------------------------------------------

// import { api } from "./api"; // ⬅️ Uncomment later for real backend

const LS_KEY = "smsTemplates";

const getLocal = () => JSON.parse(localStorage.getItem(LS_KEY)) || [];
const setLocal = (val) => localStorage.setItem(LS_KEY, JSON.stringify(val));

export const smsTemplateService = {
  // Get all templates
  async getTemplates() {
    return getLocal();

    // Later (Django):
    // const res = await api.get("/notifications/sms-templates/");
    // return res.data;
  },

  // Add new template
  async addTemplate(payload) {
    const list = getLocal();

    const newTemplate = {
      id: Date.now(),
      name: payload.name?.trim(),
      type: payload.type || "Custom",
      message: payload.message || "",
      isTransactional: !!payload.isTransactional,
      isActive: payload.isActive ?? true,
      variables: payload.variables || [],
      createdAt: new Date().toISOString(),
    };

    list.push(newTemplate);
    setLocal(list);
    return newTemplate;

    // Later:
    // return api.post("/notifications/sms-templates/", newTemplate);
  },

  // Update template
  async updateTemplate(id, updates) {
    const list = getLocal().map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    setLocal(list);
    return list.find((t) => t.id === id);

    // Later:
    // return api.put(`/notifications/sms-templates/${id}/`, updates);
  },

  // Delete template
  async deleteTemplate(id) {
    const list = getLocal().filter((t) => t.id !== id);
    setLocal(list);
    return true;

    // Later:
    // return api.delete(`/notifications/sms-templates/${id}/`);
  },
};
