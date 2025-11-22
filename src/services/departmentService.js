// ---------------------------------------------
// Production-Ready Department Service
// Backend-Ready (Django)
// ---------------------------------------------

const LS_KEY = "departments";

const getLocal = () => JSON.parse(localStorage.getItem(LS_KEY)) || [];
const setLocal = (val) => localStorage.setItem(LS_KEY, JSON.stringify(val));

export const departmentService = {

  // -------------------------------------------------------------------
  // GET ALL DEPARTMENTS (Full List)
  // -------------------------------------------------------------------
  async getAll() {
    return getLocal();

    // Django:
    // return api.get("/departments/");
  },

  // -------------------------------------------------------------------
  // GET DEPARTMENTS BY BRANCH
  // used in: AssignStaff.jsx
  // -------------------------------------------------------------------
  async getDepartmentsByBranch(branchId) {
    const list = getLocal();
    return list.filter((d) => d.branchId == branchId);

    // Django:
    // return api.get(`/departments/?branch=${branchId}`);
  },

  // -------------------------------------------------------------------
  // GET DEPARTMENTS BY ORGANIZATION (Future need)
  // -------------------------------------------------------------------
  async getDepartmentsByOrg(orgId) {
    const list = getLocal();
    return list.filter((d) => d.orgId == orgId);

    // Django:
    // return api.get(`/departments/?organization=${orgId}`);
  },

  // -------------------------------------------------------------------
  // ADD NEW DEPARTMENT
  // -------------------------------------------------------------------
  async add(payload) {
    const list = getLocal();

    const newDept = {
      id: Date.now(),
      name: payload.name,
      staff: payload.staff || 0,
      orgId: payload.orgId || null,
      branchId: payload.branchId || null,
    };

    list.push(newDept);
    setLocal(list);
    return newDept;

    // Django:
    // return api.post("/departments/", payload);
  },

  // -------------------------------------------------------------------
  // UPDATE DEPARTMENT
  // -------------------------------------------------------------------
  async update(id, updatedDept) {
    const list = getLocal().map((d) =>
      d.id === id ? { ...d, ...updatedDept } : d
    );

    setLocal(list);
    return updatedDept;

    // Django:
    // return api.put(`/departments/${id}/`, updatedDept);
  },

  // -------------------------------------------------------------------
  // DELETE DEPARTMENT
  // -------------------------------------------------------------------
  async remove(id) {
    const list = getLocal().filter((d) => d.id !== id);
    setLocal(list);
    return true;

    // Django:
    // return api.delete(`/departments/${id}/`);
  },
};
