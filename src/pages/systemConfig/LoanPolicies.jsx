// src/pages/systemConfig/LoanPolicies.jsx
import React from "react";
import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import loanPolicyService from "../../services/loanPolicyService";
import {
  FiArrowLeft,
  FiSave,
  FiAlertTriangle,
  FiInfo,
  FiSettings,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const LoanPolicies = () => {
  const navigate = useNavigate();

  const [policy, setPolicy] = useState(loanPolicyService.getPolicy());
  const [saving, setSaving] = useState(false);

  // ---- Derived / Validation ----
  const amountError = useMemo(() => {
    if (!policy.minAmount || !policy.maxAmount) return "";
    if (Number(policy.minAmount) <= 0) return "Min amount should be greater than 0.";
    if (Number(policy.maxAmount) <= Number(policy.minAmount))
      return "Max amount should be greater than Min amount.";
    return "";
  }, [policy.minAmount, policy.maxAmount]);

  const tenureError = useMemo(() => {
    if (!policy.minTenureMonths || !policy.maxTenureMonths) return "";
    if (Number(policy.minTenureMonths) <= 0)
      return "Min tenure should be at least 1 month.";
    if (Number(policy.maxTenureMonths) <= Number(policy.minTenureMonths))
      return "Max tenure should be greater than Min tenure.";
    return "";
  }, [policy.minTenureMonths, policy.maxTenureMonths]);

  const weightError = useMemo(() => {
    if (!policy.maxEmiToIncomePercent) return "";
    if (policy.maxEmiToIncomePercent <= 0 || policy.maxEmiToIncomePercent > 80)
      return "Max EMI to Income % should be between 1 and 80.";
    return "";
  }, [policy.maxEmiToIncomePercent]);

  // Example small summary text
  const summaryText = useMemo(() => {
    return `Loan range ₹${policy.minAmount?.toLocaleString?.() || policy.minAmount} 
to ₹${policy.maxAmount?.toLocaleString?.() || policy.maxAmount} with tenure ${
      policy.minTenureMonths
    }–${policy.maxTenureMonths} months.`;
  }, [policy.minAmount, policy.maxAmount, policy.minTenureMonths, policy.maxTenureMonths]);

  // ---- Handlers ----
  const updateField = (field, value) => {
    setPolicy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNumber = (field, value) => {
    const num = value === "" ? "" : Number(value);
    setPolicy((prev) => ({
      ...prev,
      [field]: num,
    }));
  };

  const updateMessage = (field, value) => {
    setPolicy((prev) => ({
      ...prev,
      validationMessages: {
        ...prev.validationMessages,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // Basic validation before save
    if (amountError || tenureError || weightError) {
      alert("Please fix validation errors before saving.");
      return;
    }

    if (!policy.minEmiAmount || Number(policy.minEmiAmount) <= 0) {
      alert("Please configure a valid minimum EMI amount.");
      return;
    }

    setSaving(true);
    const saved = loanPolicyService.savePolicy(policy);
    setPolicy(saved);
    setSaving(false);
    alert("Loan policies saved successfully!");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition shadow-sm"
          >
            <FiArrowLeft className="text-gray-700 text-xl" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FiSettings className="text-blue-600" />
              Loan Policy Configuration
            </h1>
            <p className="text-gray-500 text-sm">
              Set loan amount limits, tenure, EMI rules & validation messages for the entire system.
            </p>
          </div>
        </div>
      </div>

      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 items-start">
        {/* LEFT: Form sections */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-6">
          {/* Section: Amount Range */}
          <section>
            <SectionTitle
              title="Loan Amount Range"
              subtitle="Define minimum and maximum loan amount allowed for all loan products."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <NumberField
                label="Minimum Loan Amount (₹)"
                value={policy.minAmount}
                onChange={(v) => updateNumber("minAmount", v)}
              />
              <NumberField
                label="Maximum Loan Amount (₹)"
                value={policy.maxAmount}
                onChange={(v) => updateNumber("maxAmount", v)}
              />
            </div>

            {amountError && (
              <ErrorPill message={amountError} />
            )}
          </section>

          {/* Section: Tenure Range */}
          <section>
            <SectionTitle
              title="Tenure Configuration"
              subtitle="Set the minimum and maximum loan tenure in months."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <NumberField
                label="Minimum Tenure (months)"
                value={policy.minTenureMonths}
                onChange={(v) => updateNumber("minTenureMonths", v)}
              />
              <NumberField
                label="Maximum Tenure (months)"
                value={policy.maxTenureMonths}
                onChange={(v) => updateNumber("maxTenureMonths", v)}
              />
            </div>

            {tenureError && (
              <ErrorPill message={tenureError} />
            )}
          </section>

          {/* Section: EMI Rules */}
          <section>
            <SectionTitle
              title="EMI Rules"
              subtitle="Configure EMI minimum and affordability controls."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <NumberField
                label="Minimum EMI Amount (₹)"
                value={policy.minEmiAmount}
                onChange={(v) => updateNumber("minEmiAmount", v)}
              />
              <NumberField
                label="Max EMI as % of Net Income"
                value={policy.maxEmiToIncomePercent}
                onChange={(v) => updateNumber("maxEmiToIncomePercent", v)}
              />
            </div>

            {weightError && (
              <ErrorPill message={weightError} />
            )}
          </section>

          {/* Section: Collateral / Fee */}
          <section>
            <SectionTitle
              title="Collateral & Fee Rules"
              subtitle="Set maximum LTV and processing fee guidelines."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <NumberField
                label="Maximum LTV (%)"
                value={policy.maxLtvPercent}
                onChange={(v) => updateNumber("maxLtvPercent", v)}
              />
              <NumberField
                label="Processing Fee (%)"
                value={policy.processingFeePercent}
                onChange={(v) => updateNumber("processingFeePercent", v)}
              />
            </div>
          </section>

          {/* Section: Toggles */}
          <section>
            <SectionTitle
              title="Business Rules"
              subtitle="Additional business level checks for each loan case."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <ToggleField
                label="Loan Purpose is mandatory"
                checked={policy.requireLoanPurpose}
                onChange={(v) => updateField("requireLoanPurpose", v)}
                helper="If enabled, user must specify purpose before submitting application."
              />
              <ToggleField
                label="Allow Pre-closure"
                checked={policy.allowPreclosure}
                onChange={(v) => updateField("allowPreclosure", v)}
                helper="If disabled, loans cannot be closed before full tenure."
              />
            </div>
          </section>

          {/* Section: Validation Messages */}
          <section>
            <SectionTitle
              title="Validation Messages"
              subtitle="Customize error messages shown to branch users."
            />

            <div className="space-y-3 mt-3">
              <TextAreaField
                label="Amount out of range"
                value={policy.validationMessages.amountOutOfRange}
                onChange={(v) => updateMessage("amountOutOfRange", v)}
              />
              <TextAreaField
                label="Tenure out of range"
                value={policy.validationMessages.tenureOutOfRange}
                onChange={(v) => updateMessage("tenureOutOfRange", v)}
              />
              <TextAreaField
                label="EMI too low"
                value={policy.validationMessages.emiTooLow}
                onChange={(v) => updateMessage("emiTooLow", v)}
              />
            </div>
          </section>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FiSave />
            {saving ? "Saving..." : "Save Loan Policies"}
          </button>
        </div>

        {/* RIGHT: Summary Panel */}
        <div className="space-y-4">
          {/* Quick Summary */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-1">
              POLICY SNAPSHOT
            </p>
            <p className="text-sm text-gray-800 font-medium leading-5">
              {summaryText}
            </p>
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <FiInfo className="text-blue-500" />
              EMI should be at least ₹{policy.minEmiAmount || 0} and not exceed{" "}
              {policy.maxEmiToIncomePercent || 0}% of customer net income.
            </p>

            {policy.updatedAt && (
              <p className="text-[11px] text-gray-400 mt-3">
                Last updated:{" "}
                {new Date(policy.updatedAt).toLocaleString()}
              </p>
            )}
          </div>

          {/* Rule overview */}
          <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100 text-xs space-y-2">
            <p className="font-semibold text-gray-600 flex items-center gap-2">
              <FiAlertTriangle className="text-amber-500" />
              How this is used in loan journey
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-500">
              <li>
                Application screen will block any loan amount outside configured range.
              </li>
              <li>
                Tenure dropdown will only show values within min–max tenure.
              </li>
              <li>
                EMI calculator will enforce minimum EMI and affordability rule.
              </li>
              <li>
                If loan purpose is mandatory, application cannot be submitted without it.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

/* ------------ Small sub components ------------- */

const SectionTitle = ({ title, subtitle }) => (
  <div className="flex items-start gap-2">
    <div className="mt-1 w-1 h-5 rounded-full bg-blue-500" />
    <div>
      <p className="text-sm font-semibold text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
  </div>
);

const NumberField = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-3 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 outline-none text-sm"
    />
  </div>
);

const TextAreaField = ({ label, value, onChange }) => (
  <div className="flex flex-col">
    <label className="text-gray-700 text-sm mb-1">{label}</label>
    <textarea
      rows={2}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-3 rounded-xl bg-gray-50 focus:bg-white border border-gray-200 outline-none text-sm"
    />
  </div>
);

const ToggleField = ({ label, checked, onChange, helper }) => (
  <div className="flex flex-col border border-gray-200 rounded-2xl px-3 py-3 bg-gray-50/60">
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full flex items-center px-1 transition ${
          checked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
        }`}
      >
        <span className="w-4 h-4 bg-white rounded-full shadow" />
      </button>
    </div>
    {helper && (
      <p className="text-[11px] text-gray-500 mt-1">{helper}</p>
    )}
  </div>
);

const ErrorPill = ({ message }) => (
  <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-xs text-red-600">
    <FiAlertTriangle className="text-red-500" />
    <span>{message}</span>
  </div>
);

export default LoanPolicies;
