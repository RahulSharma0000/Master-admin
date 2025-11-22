// Backend-ready service layer (Option 2 architecture)

const getLocal = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export const organizationService = {
  
  // ---------------------------
  // ADD NEW ORGANIZATION
  // ---------------------------
  async addOrganization(payload) {
    const orgs = getLocal("organizations");
    const newOrg = { id: Date.now(), ...payload };
    orgs.push(newOrg);
    setLocal("organizations", orgs);
    return newOrg;

    // Django Later:
    // return api.post("/organizations/", payload);
  },

  // ---------------------------
  // GET ALL ORGANIZATIONS
  // ---------------------------
  async getOrganizations() {
    return getLocal("organizations");

    // Django Later:
    // return api.get("/organizations/");
  },

  // ---------------------------
  // SUMMARY STATS FOR DASHBOARD
  // ---------------------------
  async getOrganizationSummary() {
    return Promise.resolve({
      totalOrganizations: getLocal("organizations").length,
      totalBranches: getLocal("branches").length,
      departments: getLocal("departments").length,
      staffAssigned: getLocal("staffAssignments").length,
      modulesAssigned: getLocal("moduleAccess").length,
      pendingRequests: 5,
    });

    // Django Later:
    // return api.get("/organizations/summary/");
  },
  

};
