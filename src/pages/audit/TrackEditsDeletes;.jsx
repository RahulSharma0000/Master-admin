import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiSearch,
  FiTrash2,
  FiEdit3,
  FiPlus,
} from "react-icons/fi";

/* ---------------- ACTION CARD ---------------- */
const EditLogCard = ({ log, onDelete, onEdit }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <div className="flex justify-between">
      <div>
        <p className="text-gray-900 font-semibold">{log.user}</p>
        <p className="text-gray-500 text-sm">{log.email}</p>

        {/* ACTION DETAILS */}
        <p className="mt-2 text-gray-700 text-sm font-medium">
          {log.actionType}
        </p>

        {/* OLD → NEW */}
        <p className="text-xs mt-1 text-gray-500">
          <b>Old:</b> {log.oldValue}
        </p>
        <p className="text-xs text-gray-500">
          <b>New:</b> {log.newValue}
        </p>

        {/* Timestamp + IP */}
        <p className="text-xs text-gray-400 mt-1">
          {log.timestamp} • IP: {log.ip}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => onEdit(log)}
          className="p-2 rounded-full hover:bg-blue-50"
        >
          <FiEdit3 className="text-blue-600" />
        </button>

        <button
          onClick={() => onDelete(log.id)}
          className="p-2 rounded-full hover:bg-red-50"
        >
          <FiTrash2 className="text-red-600" />
        </button>
      </div>
    </div>
  </div>
);

/* ---------------- MAIN PAGE ---------------- */
const TrackEditsDeletes = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  // FORM STATES
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const emptyForm = {
    id: null,
    user: "",
    email: "",
    actionType: "",
    oldValue: "",
    newValue: "",
    ip: "",
    timestamp: "",
  };

  const [form, setForm] = useState(emptyForm);

  /* ---------------- LOAD INITIAL DATA ---------------- */
  useEffect(() => {
    const demoData = [
      {
        id: 1,
        user: "Rahul Kumar",
        email: "rahul@example.com",
        actionType: "Updated Loan Info",
        oldValue: "Loan Amount: ₹50,000",
        newValue: "Loan Amount: ₹55,000",
        timestamp: "2025-11-22 • 11:20 AM",
        ip: "192.168.1.10",
      },
      {
        id: 2,
        user: "Amit Sharma",
        email: "amit@example.com",
        actionType: "Deleted Customer Document",
        oldValue: "Document Uploaded",
        newValue: "Document Deleted",
        timestamp: "2025-11-22 • 10:05 AM",
        ip: "192.168.1.44",
      },
    ];
    setLogs(demoData);
  }, []);

  /* ---------------- CRUD HANDLERS ---------------- */

  const handleAddNew = () => {
    setForm(emptyForm);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editMode) {
      // UPDATE
      setLogs(
        logs.map((l) => (l.id === form.id ? form : l))
      );
    } else {
      // CREATE
      setLogs([...logs, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleEdit = (log) => {
    setForm(log);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  /* ---------------- SEARCH FILTER ---------------- */
  const filtered = logs.filter(
    (i) =>
      i.user.toLowerCase().includes(search.toLowerCase()) ||
      i.actionType.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- UI START ---------------- */
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
          <h1 className="text-2xl font-semibold text-gray-900">
            Track Edits & Deletes
          </h1>
          <p className="text-gray-500 text-sm">
            View all updates, deleted data & modification logs.
          </p>
        </div>
      </div>

      {/* ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <FiPlus />
          Add New Log
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 mb-6 flex items-center gap-3">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search by user, email or action..."
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
          filtered.map((log) => (
            <EditLogCard
              key={log.id}
              log={log}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-[400px] space-y-4">

            <h2 className="text-lg font-semibold">
              {editMode ? "Edit Log" : "Add New Log"}
            </h2>

            {/* FORM FIELDS */}
            <div className="space-y-3">
              {[
                "user",
                "email",
                "actionType",
                "oldValue",
                "newValue",
                "ip",
                "timestamp",
              ].map((f) => (
                <input
                  key={f}
                  placeholder={f}
                  value={form[f]}
                  onChange={(e) =>
                    setForm({ ...form, [f]: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200"
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

export default TrackEditsDeletes;
