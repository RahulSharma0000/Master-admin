// -------------------------------------------
// Loan Policy Service (Option 2 Architecture)
// LocalStorage NOW  → Backend (Django) LATER
// -------------------------------------------

// If you add API later:
// import { api } from "./api";

const LS_KEY = "loanPolicies";

// Simple LS helpers
const getLocal = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || null;
  } catch (e) {
    return null;
  }
};

const setLocal = (val) => {
  localStorage.setItem(LS_KEY, JSON.stringify(val));
};

// Default policy when nothing saved yet
const defaultPolicy = {
  minAmount: 10000,
  maxAmount: 500000,
  minTenureMonths: 6,
  maxTenureMonths: 60,
  minEmiAmount: 1000,
  maxEmiToIncomePercent: 50,
  allowPreclosure: true,
  requireLoanPurpose: true,
  maxLtvPercent: 75,
  processingFeePercent: 2,
  validationMessages: {
    amountOutOfRange:
      "Requested amount must be within allowed min & max loan amount range.",
    tenureOutOfRange:
      "Loan tenure must be within configured tenure range (in months).",
    emiTooLow: "EMI should be higher than minimum EMI configured.",
  },
  updatedAt: null,
};

const loanPolicyService = {
  // -----------------------------
  // GET POLICY (SYNC)
  // -----------------------------
  getPolicy() {
    const saved = getLocal();
    if (!saved) return defaultPolicy;
    // merge in case we add new fields in future
    return {
      ...defaultPolicy,
      ...saved,
      validationMessages: {
        ...defaultPolicy.validationMessages,
        ...(saved.validationMessages || {}),
      },
    };

    // Later with backend:
    // const res = await api.get("/loan-policies/");
    // return res.data;
  },

  // -----------------------------
  // SAVE POLICY (SYNC)
  // -----------------------------
  savePolicy(policy) {
    const payload = {
      ...policy,
      updatedAt: new Date().toISOString(),
    };
    setLocal(payload);
    return payload;

    // Later with backend:
    // const res = await api.post("/loan-policies/", payload);
    // return res.data;
  },
};

export default loanPolicyService;