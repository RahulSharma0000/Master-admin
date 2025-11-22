import React, { useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { FiArrowLeft, FiSave, FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { organizationService } from "../../services/organizationService";

export default function AddOrganization() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    contact_person: "",
    phone: "",
    email: "",
    gst_number: "",
    pan_number: "",
    business_type: "",
    registration_no: "",
    loan_prefix: "",
    is_active: true,
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      const payload = { ...form, logo: logo ? logo.name : null };

      await organizationService.addOrganization(payload);

      navigate("/organization");
    } catch (err) {
      setErrors("Something went wrong while saving.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition border border-gray-200"
        >
          <FiArrowLeft className="text-gray-700 text-lg" />
        </button>

        <div>
          <h1 className="text-[22px] font-semibold text-gray-900">
            Add New Organization
          </h1>
          <p className="text-gray-500 text-sm">
            Enter company details to register a new organization.
          </p>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm max-w-4xl">

        {errors && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
            {errors}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* GRID FIELDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <InputField
              label="Organization Name *"
              name="name"
              placeholder="ABC Finance Pvt Ltd"
              value={form.name}
              onChange={handleChange}
              required
            />

            <SelectField
              label="Business Type *"
              name="business_type"
              value={form.business_type}
              onChange={handleChange}
              required
              options={[
                "NBFC",
                "Micro Finance",
                "Cooperative Society",
                "Private Lender",
              ]}
            />

            <InputField
              label="Contact Person *"
              name="contact_person"
              value={form.contact_person}
              onChange={handleChange}
              placeholder="Rahul Sharma"
              required
            />

            <InputField
              label="Email Address *"
              name="email"
              type="email"
              placeholder="support@abcfinance.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <InputField
              label="Phone Number *"
              name="phone"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <InputField
              label="Registration No / CIN"
              name="registration_no"
              placeholder="U12345MH2019PTC123456"
              value={form.registration_no}
              onChange={handleChange}
            />

            <InputField
              label="GST Number"
              name="gst_number"
              placeholder="22AAAAA0000A1Z5"
              maxLength={15}
              value={form.gst_number}
              onChange={handleChange}
            />

            <InputField
              label="PAN Number"
              name="pan_number"
              placeholder="ABCDE1234F"
              maxLength={10}
              value={form.pan_number}
              onChange={handleChange}
            />

            <InputField
              label="Loan ID Prefix *"
              name="loan_prefix"
              placeholder="ABC"
              value={form.loan_prefix}
              onChange={handleChange}
              required
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Full Address *</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Head Office Address"
              className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white outline-none text-sm"
            />
          </div>

          {/* LOGO UPLOAD */}
          <div>
            <label className="text-gray-700 text-sm font-medium">Company Logo</label>
            <div className="mt-3 flex items-center gap-4">
              <label className="px-4 py-3 rounded-xl bg-gray-50 border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 flex items-center gap-2 text-sm text-gray-700">
                <FiUploadCloud className="text-gray-600 text-lg" />
                <span>Upload Logo</span>
                <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
              </label>

              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="h-16 w-16 rounded-xl border border-gray-200 shadow-sm object-cover"
                />
              )}
            </div>
          </div>

          {/* ACTIVE STATUS */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="w-5 h-5"
            />
            <label className="text-gray-700 text-sm font-medium">Active Organization</label>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition text-sm"
          >
            <FiSave className="text-lg" />
            {loading ? "Saving..." : "Save Organization"}
          </button>

        </form>
      </div>
    </MainLayout>
  );
}

/* ---------------- INPUT FIELD ---------------- */
function InputField({ label, ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white outline-none text-sm"
      />
    </div>
  );
}

/* ---------------- SELECT FIELD ---------------- */
function SelectField({ label, options = [], ...props }) {
  return (
    <div>
      <label className="text-gray-700 text-sm font-medium">{label}</label>
      <select
        {...props}
        className="w-full mt-2 p-3 rounded-xl bg-gray-50 border border-gray-200 outline-none text-sm"
      >
        <option value="">Select option</option>
        {options.map((op, i) => (
          <option key={i} value={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
}
