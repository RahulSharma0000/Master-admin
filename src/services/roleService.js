// -------------------------------------
// LocalStorage Backend (Option 2)
// Future: Switch to Django without UI changes
// -------------------------------------

const getLocal = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const ROLE_KEY = "roles";
const ROLE_PERMISSION_KEY = "rolePermissions";

export const roleService = {

  // -----------------------------
  // GET ALL ROLES (SYNC)
  // -----------------------------
  getRoles() {
    return getLocal(ROLE_KEY) || [];
    // Later Django:
    // return (await api.get("/roles/")).data;
  },

  // -----------------------------
  // ADD ROLE (SYNC)
  // -----------------------------
  addRole(roleName) {
    const roles = getLocal(ROLE_KEY);

    const newRole = {
      id: Date.now(),
      roleName: roleName.trim(),
      createdAt: new Date().toISOString(),
    };

    roles.push(newRole);
    setLocal(ROLE_KEY, roles);

    return newRole;
  },

  // -----------------------------
  // SAVE PERMISSIONS for ROLE (SYNC)
  // -----------------------------
  savePermissions(roleId, permissions) {
    let all = getLocal(ROLE_PERMISSION_KEY);

    const existingIndex = all.findIndex((p) => p.roleId === roleId);

    if (existingIndex >= 0) {
      all[existingIndex].permissions = permissions;
    } else {
      all.push({ roleId, permissions });
    }

    setLocal(ROLE_PERMISSION_KEY, all);
    return true;
  },

  // -----------------------------
  // GET PERMISSIONS for ROLE (SYNC)
  // -----------------------------
  getPermissions(roleId) {
    const all = getLocal(ROLE_PERMISSION_KEY);
    return all.find((p) => p.roleId === roleId)?.permissions || {};
  },

  // -------------------------------------------------------
  // DELETE ROLE + REMOVE ITS PERMISSIONS (IMPORTANT FEATURE)
  // -------------------------------------------------------
  deleteRole(roleId) {
    // 1. Remove from roles table
    const updatedRoles = getLocal(ROLE_KEY).filter((r) => r.id !== roleId);
    setLocal(ROLE_KEY, updatedRoles);

    // 2. Remove its permissions mapping
    const updatedPerms = getLocal(ROLE_PERMISSION_KEY).filter(
      (p) => p.roleId !== roleId
    );
    setLocal(ROLE_PERMISSION_KEY, updatedPerms);

    return true;
  }
};
