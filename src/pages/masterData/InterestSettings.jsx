import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiSave,
  FiTrash2,
  FiPlus,
  FiPercent,
  FiInfo,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { interestService } from "../../services/interestService";

const InterestSettings = () => {
  const navigate = useNavigate();

  // MAIN FORM
  const [form, setForm] = useState({
    baseRoi: "",
    processingFee: "",
    penalty: "",
  });

  // ROI SLABS
  const [slabs, setSlabs] = useState([]);
  const [newSlab, setNewSlab] = useState({
    min: "",
    max: "",
    roi: "",
  });

  // LOAD SAVED DATA
  useEffect(() => {
    const saved = interestService.getSettings();
    if (saved.baseRoi) setForm(saved);

    if (saved.roiSlabs) setSlabs(saved.roiSlabs);
  }, []);

  // ----------------------------
  // Save Main Settings
  // ----------------------------
  const saveSettings = () => {
    if (!form.baseRoi) return alert("Base ROI is required");

    interestService.saveSettings(form);
    alert("Interest settings saved!");
  };

  // ----------------------------
  // Add ROI Slab
  // ----------------------------
  const addSlab = () => {
    if (!newSlab.min || !newSlab.max || !newSlab.roi) {
      return alert("All fields are required for ROI slab");
    }

    interestService.addRoiSlab(newSlab);
    setSlabs(interestService.getSettings().roiSlabs);

    setNewSlab({ min: "", max: "", roi: "" });
  };

  // ----------------------------
  // Delete ROI Slab
  // ----------------------------
  const removeSlab = (id) => {
    interestService.deleteRoiSlab(id);
    setSlabs(interestService.getSettings().roiSlabs);
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 border rounded-xl">
          <FiArrowLeft />
        </button>

        <div>
          <h1 className="text-2xl font-bold">Interest Settings</h1>
          <p className="text-gray-500 text-sm">
            Manage ROI, processing fees and penalty structure.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        {/* LEFT PANEL */}
        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6">
          {/* BASE SETTINGS */}
          <h2 className="font-semibold text-gray-700 text-lg flex items-center gap-2">
            <FiPercent /> Base Interest & Charges
          </h2>

          <Input
            label="Base Rate of Interest (%)"
            value={form.baseRoi}
            onChange={(v) => setForm({ ...form, baseRoi: v })}
          />

          <Input
            label="Processing Fee (%)"
            value={form.processingFee}
            onChange={(v) => setForm({ ...form, processingFee: v })}
          />

          <Input
            label="Penalty on Delay (%)"
            value={form.penalty}
            onChange={(v) => setForm({ ...form, penalty: v })}
          />

          {/* SAVE MAIN SETTINGS */}
          <button
            onClick={saveSettings}
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <FiSave />
            Save Settings
          </button>

          <hr className="my-6" />

          {/* ROI SLABS */}
          <h2 className="font-semibold text-gray-700 text-lg flex items-center gap-2">
            <FiInfo /> ROI Slabs (Based on Loan Amount)
          </h2>
          <p className="text-gray-500 text-sm -mt-2 mb-3">
            Configure interest rate range based on loan amount.
          </p>

          {/* ADD SLAB */}
          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              placeholder="Min Amount"
              value={newSlab.min}
              onChange={(e) =>
                setNewSlab({ ...newSlab, min: e.target.value })
              }
              className="p-3 border rounded-lg"
            />

            <input
              type="number"
              placeholder="Max Amount"
              value={newSlab.max}
              onChange={(e) =>
                setNewSlab({ ...newSlab, max: e.target.value })
              }
              className="p-3 border rounded-lg"
            />

            <input
              type="number"
              placeholder="ROI (%)"
              value={newSlab.roi}
              onChange={(e) =>
                setNewSlab({ ...newSlab, roi: e.target.value })
              }
              className="p-3 border rounded-lg"
            />
          </div>

          <button
            onClick={addSlab}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <FiPlus /> Add Slab
          </button>

          {/* LIST SLABS */}
          <div className="mt-5 space-y-3">
            {slabs.map((s) => (
              <div
                key={s.id}
                className="p-3 bg-gray-50 border rounded-xl flex justify-between"
              >
                <span>
                  <b>{s.min}</b> – <b>{s.max}</b> : {s.roi}% ROI
                </span>

                <button
                  onClick={() => removeSlab(s.id)}
                  className="text-red-600 p-2 hover:bg-red-100 rounded-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}

            {slabs.length === 0 && (
              <p className="text-gray-400 text-sm">No ROI slabs added</p>
            )}
          </div>
        </div>

        {/* RIGHT SUMMARY PANEL */}
        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
          <h2 className="font-semibold text-gray-700 text-sm">SUMMARY</h2>

          <div className="space-y-2">
            <Summary label="Base ROI" value={form.baseRoi + "%"} />
            <Summary label="Processing Fee" value={form.processingFee + "%"} />
            <Summary label="Penalty" value={form.penalty + "%"} />
          </div>

          <hr />

          <h2 className="font-semibold text-gray-700 text-sm">ROI Slabs</h2>
          <div className="space-y-2">
            {slabs.map((s) => (
              <div
                key={s.id}
                className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-2 rounded-lg text-xs"
              >
                {s.min} – {s.max} : <b>{s.roi}%</b>
              </div>
            ))}

            {slabs.length === 0 && (
              <p className="text-gray-400 text-xs">No slabs added.</p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-3 mt-1 border rounded-xl w-full"
    />
  </div>
);

const Summary = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span>{label}</span>
    <span className="font-semibold">{value || "-"}</span>
  </div>
);

export default InterestSettings;
