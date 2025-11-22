import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave, FiKey, FiShield, FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const KEY = "securitySettings";

// Default structure
const defaultSettings = {
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireNumber: true,
    requireSpecialChar: false,
  },

  twoFA: {
    enabled: false,
    method: "sms", // sms | email | authenticator
  },

  apiToken: {
    token: "",
    createdAt: null,
  },
};

const SecuritySettings = () => {
  const navigate = useNavigate();

  // ------------------------------------
  // Load saved settings
  // ------------------------------------
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved) setSettings(saved);
  }, []);

  // ------------------------------------
  // Update helpers
  // ------------------------------------
  const updatePassword = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      passwordPolicy: { ...prev.passwordPolicy, [key]: value },
    }));
  };

  const update2FA = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      twoFA: { ...prev.twoFA, [key]: value },
    }));
  };

  const generateToken = () => {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);

    setSettings((prev) => ({
      ...prev,
      apiToken: {
        token,
        createdAt: new Date().toISOString(),
      },
    }));
  };

  const deleteToken = () => {
    setSettings((prev) => ({
      ...prev,
      apiToken: { token: "", createdAt: null },
    }));
  };

  const saveAll = () => {
    if (settings.passwordPolicy.minLength < 6) {
      return alert("Password minimum length should be at least 6!");
    }

    localStorage.setItem(KEY, JSON.stringify(settings));
    alert("Security settings saved successfully!");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 border rounded-xl bg-gray-50">
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold">Security Settings</h1>
          <p className="text-gray-500 text-sm">
            Configure password policy, 2FA authentication & API token access.
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="space-y-8 max-w-4xl">

        {/* --------------------------- */}
        {/* PASSWORD POLICY */}
        {/* --------------------------- */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiKey /> Password Policy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Minimum Password Length"
              type="number"
              value={settings.passwordPolicy.minLength}
              onChange={(v) => updatePassword("minLength", Number(v))}
            />

            <Toggle
              label="Require Uppercase Letters"
              checked={settings.passwordPolicy.requireUppercase}
              onChange={() =>
                updatePassword("requireUppercase", !settings.passwordPolicy.requireUppercase)
              }
            />

            <Toggle
              label="Require Numbers"
              checked={settings.passwordPolicy.requireNumber}
              onChange={() =>
                updatePassword("requireNumber", !settings.passwordPolicy.requireNumber)
              }
            />

            <Toggle
              label="Require Special Characters"
              checked={settings.passwordPolicy.requireSpecialChar}
              onChange={() =>
                updatePassword("requireSpecialChar", !settings.passwordPolicy.requireSpecialChar)
              }
            />
          </div>
        </section>

        {/* --------------------------- */}
        {/* 2FA SETTINGS */}
        {/* --------------------------- */}
        <section className="bg-white p-6 rounded-2xl shadow-sm ">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiShield /> Two-Factor Authentication (2FA)
          </h2>

          <Toggle
            label="Enable 2FA Authentication"
            checked={settings.twoFA.enabled}
            onChange={() => update2FA("enabled", !settings.twoFA.enabled)}
          />

          {settings.twoFA.enabled && (
            <div className="mt-4">
              <label className="text-sm font-medium">2FA Method</label>

              <select
                value={settings.twoFA.method}
                onChange={(e) => update2FA("method", e.target.value)}
                className="p-3 border rounded-xl w-full bg-gray-50 mt-2"
              >
                <option value="sms">SMS OTP</option>
                <option value="email">Email OTP</option>
                <option value="authenticator">Authenticator App</option>
              </select>
            </div>
          )}
        </section>

        {/* --------------------------- */}
        {/* API TOKEN */}
        {/* --------------------------- */}
        <section className="bg-white p-6 rounded-2xl shadow-sm ">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FiKey /> API Token Management
          </h2>

          {settings.apiToken.token ? (
            <div className="bg-gray-50 p-4 rounded-xl border mb-4">
              <p className="text-xs text-gray-600">Active Token:</p>
              <p className="font-mono text-sm break-all">{settings.apiToken.token}</p>
              <p className="text-xs text-gray-500 mt-1">
                Created: {new Date(settings.apiToken.createdAt).toLocaleString()}
              </p>

              <button
                onClick={deleteToken}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded-xl text-sm"
              >
                Delete Token
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-3">No API token generated yet.</p>
          )}

          <button
            onClick={generateToken}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2"
          >
            <FiRefreshCw /> Generate New Token
          </button>
        </section>

        {/* SAVE BUTTON */}
        <button
          onClick={saveAll}
          className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <FiSave /> Save Security Settings
        </button>
      </div>
    </MainLayout>
  );
};

// -------------------------
// Reusable Components
// -------------------------
const InputField = ({ label, value, onChange, type }) => (
  <div className="flex flex-col">
    <label className="text-gray-600 text-sm">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-3 border rounded-xl mt-1 bg-gray-50"
    />
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-3 cursor-pointer bg-gray-50 p-3 border rounded-xl">
    <input type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
);

export default SecuritySettings;
