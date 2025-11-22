import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiSave,
  FiTrash2,
  FiPlusCircle,
  FiEye,
  FiFileText,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { templateService } from "../../services/templateService";

// Predefined variables shown to users
const VARIABLES = [
  "customer_name",
  "customer_address",
  "mobile",
  "loan_amount",
  "loan_tenure",
  "interest_rate",
  "processing_fee",
  "branch_name",
  "agreement_date",
];

const CATEGORIES = [
  "KYC Document",
  "Loan Agreement",
  "Collection Notice",
  "NACH Mandate",
  "General Template",
];

const DocumentTemplates = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");

  // -------------------------------------------
  // Load saved templates
  // -------------------------------------------
  useEffect(() => {
    setTemplates(templateService.getTemplates());
  }, []);

  // -------------------------------------------
  // Save Template
  // -------------------------------------------
  const saveTemplate = () => {
    if (!templateName.trim()) return alert("Template name is required!");
    if (!category.trim()) return alert("Select a category!");
    if (!content.trim()) return alert("Content cannot be empty!");

    const newTemplate = {
      id: Date.now(),
      name: templateName,
      category,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    templateService.addTemplate(newTemplate);
    setTemplates(templateService.getTemplates());

    alert("Template saved!");

    setTemplateName("");
    setCategory("");
    setContent("");
    setPreview("");
  };

  // -------------------------------------------
  // Delete Template
  // -------------------------------------------
  const removeTemplate = (id) => {
    templateService.deleteTemplate(id);
    setTemplates(templateService.getTemplates());
  };

  // -------------------------------------------
  // Variable insertion helper
  // -------------------------------------------
  const insertVariable = (v) => {
    setContent((prev) => prev + ` {{${v}}} `);
  };

  // Update preview in real-time
  useEffect(() => {
    setPreview(content);
  }, [content]);

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 border rounded-xl">
          <FiArrowLeft />
        </button>

        <h1 className="text-2xl font-bold">Document Templates</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
        {/* ---------------- LEFT PANEL ---------------- */}
        <div className="bg-white p-6 rounded-xl shadow-sm  space-y-4">
          {/* Template Name */}
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Template Name (e.g., Loan Agreement)"
            className="p-3 border rounded-xl w-full"
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border rounded-xl w-full"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Variables Selector */}
          <div className="bg-gray-50 p-3 rounded-xl ">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Insert Variables:
            </p>

            <div className="flex flex-wrap gap-2">
              {VARIABLES.map((v) => (
                <button
                  key={v}
                  onClick={() => insertVariable(v)}
                  className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-full"
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Content Editor */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write template content..."
            rows={8}
            className="p-3 border rounded-xl w-full"
          />

          {/* Save Button */}
          <button
            onClick={saveTemplate}
            className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <FiSave />
            Save Template
          </button>
        </div>

        {/* ---------------- RIGHT PANEL (Preview) ---------------- */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FiEye /> Live Preview
          </h2>

          <div className="h-80 overflow-auto bg-gray-50 p-4 rounded-xl border text-sm whitespace-pre-wrap">
            {preview || (
              <span className="text-gray-400">Template preview will appear here…</span>
            )}
          </div>
        </div>
      </div>

      {/* ---------------- TEMPLATE LIST ---------------- */}
      <div className="bg-white p-6 rounded-xl shadow-sm border  mt-8">
        <h2 className="text-lg font-semibold mb-4">Saved Templates</h2>

        {templates.length === 0 ? (
          <p className="text-gray-500 text-sm">No templates created yet.</p>
        ) : (
          <div className="space-y-3 ">
            {templates.map((t) => (
              <div
                key={t.id}
                className="p-4 bg-gray-50 border rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.category}</p>
                  <p className="text-[10px] text-gray-400">
                    Updated: {new Date(t.updatedAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => removeTemplate(t.id)}
                  className="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DocumentTemplates;
