import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave, FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const KEY = "repaymentRules";

// Default rule values
const defaultRules = {
  emiDate: 5,
  gracePeriod: 3,

  autoDebit: {
    enabled: false,
    mode: "netbanking", // netbanking | upi | mandate
    mandateRequired: false,
  },

  lateFee: {
    type: "fixed", // fixed | percent
    fixedAmount: 200,
    percent: 2,
    maxCap: 1000,
  },
};

const RepaymentRules = () => {
  const navigate = useNavigate();
  const [rules, setRules] = useState(defaultRules);

  // Load existing rules
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) setRules(saved);
  }, []);

  // Save settings
  const saveRules = () => {
    if (rules.emiDate < 1 || rules.emiDate > 28)
      return alert("EMI date must be between 1 and 28");

    if (rules.lateFee.type === "percent" && rules.lateFee.percent > 10)
      return alert("Late fee percentage cannot exceed 10%");

    localStorage.setItem(KEY, JSON.stringify(rules));
    alert("Repayment rules saved successfully!");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 border rounded-xl">
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">Set Repayment Rules</h1>
          <p className="text-gray-500 text-sm">
            Configure EMI schedule, auto-debit, and late fee policies.
          </p>
        </div>
      </div>

      {/* MAIN WRAPPER */}
      <div className="space-y-8 max-w-4xl">

        {/* EMI SETTINGS */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiSettings /> EMI Date Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Default EMI Date (1-28)"
              type="number"
              value={rules.emiDate}
              onChange={(v) =>
                setRules({ ...rules, emiDate: Number(v) })
              }
            />

            <Input
              label="Grace Period (Days)"
              type="number"
              value={rules.gracePeriod}
              onChange={(v) =>
                setRules({ ...rules, gracePeriod: Number(v) })
              }
            />
          </div>
        </section>

        {/* AUTO DEBIT SETTINGS */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiSettings /> Auto-Debit Settings
          </h2>

          <Toggle
            label="Enable Auto-Debit"
            checked={rules.autoDebit.enabled}
            onChange={() =>
              setRules({
                ...rules,
                autoDebit: {
                  ...rules.autoDebit,
                  enabled: !rules.autoDebit.enabled,
                },
              })
            }
          />

          {rules.autoDebit.enabled && (
            <>
              <div className="mt-4">
                <label className="text-sm font-medium">Auto-Debit Mode</label>
                <select
                  value={rules.autoDebit.mode}
                  onChange={(e) =>
                    setRules({
                      ...rules,
                      autoDebit: { ...rules.autoDebit, mode: e.target.value },
                    })
                  }
                  className="p-3 border rounded-xl bg-gray-50 mt-1 w-full"
                >
                  <option value="netbanking">NetBanking</option>
                  <option value="upi">UPI AutoPay</option>
                  <option value="mandate">NACH Mandate</option>
                </select>
              </div>

              {rules.autoDebit.mode === "mandate" && (
                <Toggle
                  label="Mandate Required"
                  checked={rules.autoDebit.mandateRequired}
                  onChange={() =>
                    setRules({
                      ...rules,
                      autoDebit: {
                        ...rules.autoDebit,
                        mandateRequired: !rules.autoDebit.mandateRequired,
                      },
                    })
                  }
                />
              )}
            </>
          )}
        </section>

        {/* LATE PAYMENT SETTINGS */}
        <section className="bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiSettings /> Late Payment Fee Rules
          </h2>

          <div className="flex gap-4 mb-4">
            <Radio
              label="Fixed Fee"
              checked={rules.lateFee.type === "fixed"}
              onChange={() =>
                setRules({
                  ...rules,
                  lateFee: { ...rules.lateFee, type: "fixed" },
                })
              }
            />

            <Radio
              label="Percentage Based"
              checked={rules.lateFee.type === "percent"}
              onChange={() =>
                setRules({
                  ...rules,
                  lateFee: { ...rules.lateFee, type: "percent" },
                })
              }
            />
          </div>

          {rules.lateFee.type === "fixed" ? (
            <Input
              label="Fixed Late Fee Amount"
              type="number"
              value={rules.lateFee.fixedAmount}
              onChange={(v) =>
                setRules({
                  ...rules,
                  lateFee: { ...rules.lateFee, fixedAmount: Number(v) },
                })
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Late Fee (%)"
                type="number"
                value={rules.lateFee.percent}
                onChange={(v) =>
                  setRules({
                    ...rules,
                    lateFee: { ...rules.lateFee, percent: Number(v) },
                  })
                }
              />

              <Input
                label="Maximum Late Fee Cap"
                type="number"
                value={rules.lateFee.maxCap}
                onChange={(v) =>
                  setRules({
                    ...rules,
                    lateFee: { ...rules.lateFee, maxCap: Number(v) },
                  })
                }
              />
            </div>
          )}
        </section>

        {/* SAVE BUTTON */}
        <button
          onClick={saveRules}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
        >
          <FiSave /> Save Repayment Rules
        </button>
      </div>
    </MainLayout>
  );
};

/* ------------------------------
   REUSABLE COMPONENTS
------------------------------ */

const Input = ({ label, type = "text", value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-sm text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-3 mt-1 border rounded-xl bg-gray-50"
    />
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer bg-gray-50 p-3 rounded-xl border">
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);

const Radio = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="radio" checked={checked} onChange={onChange} />
    {label}
  </label>
);

export default RepaymentRules;
