// ---------------------------------------------
// Production-Ready Branch Service (Backend Ready)
// LocalStorage mock until Django API completes
// ---------------------------------------------

const LS_KEY = "branches";

const getLocal = () => JSON.parse(localStorage.getItem(LS_KEY)) || [];
const setLocal = (val) => localStorage.setItem(LS_KEY, JSON.stringify(val));

export const branchService = {

  // -------------------------------------------------------------------
  // GET ALL BRANCHES
  // -------------------------------------------------------------------
  async getBranches() {
    return getLocal();

    // Django later:
    // return api.get("/branches/");
  },

  // -------------------------------------------------------------------
  // GET BRANCHES BY ORGANIZATION (Used in AssignStaff, ModuleAccess)
  // -------------------------------------------------------------------
  async getBranchesByOrg(orgId) {
    const list = getLocal();
    return list.filter((b) => b.organizationId == orgId);

    // Django later:
    // return api.get(`/branches/?organization=${orgId}`);
  },

  // -------------------------------------------------------------------
  // ADD NEW BRANCH
  // -------------------------------------------------------------------
  async addBranch(payload) {
    const list = getLocal();

    const newBranch = {
      id: Date.now(),
      organizationId: payload.organizationId,
      organizationName: payload.organizationName || "",
      name: payload.name,
      address: payload.address,
      contactPerson: payload.contactPerson,
      phone: payload.phone,
    };

    list.push(newBranch);
    setLocal(list);
    return newBranch;

    // Django:
    // return api.post("/branches/", payload);
  },

  // -------------------------------------------------------------------
  // UPDATE BRANCH (future use)
  // -------------------------------------------------------------------
  async updateBranch(id, updatedValues) {
    const list = getLocal().map((b) =>
      b.id === id ? { ...b, ...updatedValues } : b
    );
    setLocal(list);
    return true;

    // Django:
    // return api.put(`/branches/${id}/`, updatedValues);
  },

  // -------------------------------------------------------------------
  // DELETE BRANCH (future: add confirm + check dependencies)
  // -------------------------------------------------------------------
  async deleteBranch(id) {
    const list = getLocal().filter((b) => b.id !== id);
    setLocal(list);
    return true;

    // Django:
    // return api.delete(`/branches/${id}/`);
  },
};
