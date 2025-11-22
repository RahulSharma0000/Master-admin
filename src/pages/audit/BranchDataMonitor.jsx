import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiSearch,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiDatabase,
} from "react-icons/fi";

/* ------------------- Card UI ------------------- */
const BranchDataCard = ({ item, onEdit, onDelete }) => (
  <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-semibold text-gray-900">{item.branchName}</p>
        <p className="text-gray-500 text-sm mb-2">{item.location}</p>

        {/* Status */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === "Success"
              ? "bg-green-100 text-green-700"
              : item.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {item.status}
        </span>

        {/* Records */}
        <p className="text-gray-700 text-sm mt-3">
          <b>Records:</b> {item.records}
        </p>

        {/* Timestamp */}
        <p className="text-gray-500 text-xs mt-1">{item.timestamp}</p>

        {/* Triggered by */}
        <p className="text-gray-400 text-xs">Triggered by: {item.user}</p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => onEdit(item)}
          className="p-2 rounded-full hover:bg-blue-50"
        >
          <FiEdit3 className="text-blue-600" />
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="p-2 rounded-full hover:bg-red-50"
        >
          <FiTrash2 className="text-red-600" />
        </button>
      </div>
    </div>
  </div>
);

/* ------------------- MAIN PAGE ------------------- */
const BranchDataMonitor = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const emptyForm = {
    id: null,
    branchName: "",
    location: "",
    status: "",
    records: "",
    timestamp: "",
    user: "",
  };

  const [form, setForm] = useState(emptyForm);

  /* ------------------- DEMO DATA LOAD ------------------- */
  useEffect(() => {
    setLogs([
      {
        id: 1,
        branchName: "Delhi Central Branch",
        location: "Delhi, India",
        status: "Success",
        records: "1200",
        timestamp: "2025-11-22 11:15 AM",
        user: "Rahul Kumar",
      },
      {
        id: 2,
        branchName: "Mumbai East Branch",
        location: "Mumbai, India",
        status: "Pending",
        records: "650",
        timestamp: "2025-11-22 10:45 AM",
        user: "Amit Sharma",
      },
      {
        id: 3,
        branchName: "Bangalore South Branch",
        location: "Bangalore, India",
        status: "Failed",
        records: "0",
        timestamp: "2025-11-21 05:20 PM",
        user: "Priya Singh",
      },
    ]);
  }, []);

  /* ------------------- CRUD HANDLERS ------------------- */

  const handleAdd = () => {
    setForm(emptyForm);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editMode) {
      setLogs(logs.map((l) => (l.id === form.id ? form : l)));
    } else {
      setLogs([...logs, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
    setModalOpen(true);
  };

  /* ------------------- SEARCH FILTER ------------------- */

  const filtered = logs.filter(
    (l) =>
      l.branchName.toLowerCase().includes(search.toLowerCase()) ||
      l.status.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase())
  );

  /* ------------------- UI ------------------- */

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => window.history.back()}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200"
        >
          <FiArrowLeft className="text-gray-700 text-xl" />
        </button>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <FiDatabase /> Monitor Branch Data Generation
          </h1>
          <p className="text-gray-500 text-sm">
            Track branch-level data sync status, records and timestamps.
          </p>
        </div>
      </div>

      {/* ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <FiPlus /> Add Branch Log
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 mb-6 flex items-center gap-3">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search by branch, status, or user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No logs found.</p>
        ) : (
          filtered.map((item) => (
            <BranchDataCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-[420px] space-y-4">
            <h2 className="text-lg font-semibold">
              {editMode ? "Edit Branch Log" : "Add Branch Log"}
            </h2>

            <div className="space-y-3">
              {[
                "branchName",
                "location",
                "status",
                "records",
                "timestamp",
                "user",
              ].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-300 text-sm"
                />
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default BranchDataMonitor;
