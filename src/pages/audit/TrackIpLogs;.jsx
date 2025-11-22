import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiSearch,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiGlobe,
} from "react-icons/fi";

const IpLogCard = ({ log, onDelete, onEdit }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-semibold text-gray-900">{log.user}</p>
        <p className="text-gray-500 text-sm">{log.email}</p>

        <p className="mt-2 flex items-center gap-2 text-gray-700 text-sm">
          <FiGlobe /> {log.ip}
        </p>

        <p className="text-xs text-gray-400 mt-1">{log.timestamp}</p>
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

const TrackIpLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const emptyForm = {
    id: null,
    user: "",
    email: "",
    ip: "",
    timestamp: "",
  };

  const [form, setForm] = useState(emptyForm);

  /* ----------- LOAD DEMO DATA ----------- */
  useEffect(() => {
    setLogs([
      {
        id: 1,
        user: "Rahul Kumar",
        email: "rahul@example.com",
        ip: "192.168.1.22",
        timestamp: "2025-11-22 09:58 AM",
      },
      {
        id: 2,
        user: "Amit Sharma",
        email: "amit@example.com",
        ip: "192.168.1.10",
        timestamp: "2025-11-22 08:40 AM",
      },
      {
        id: 3,
        user: "Priya Singh",
        email: "priya@example.com",
        ip: "192.168.1.77",
        timestamp: "2025-11-21 06:22 PM",
      },
    ]);
  }, []);

  /* ----------- CRUD HANDLERS ----------- */

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

  const handleEdit = (log) => {
    setForm(log);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setLogs(logs.filter((l) => l.id !== id));
  };

  /* ----------- SEARCH FILTER ----------- */

  const filtered = logs.filter(
    (l) =>
      l.user.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.ip.includes(search)
  );

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
            Track IP Addresses
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor login IPs, locations and timestamp history.
          </p>
        </div>
      </div>

      {/* ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <FiPlus /> Add IP Log
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="w-full bg-white border border-gray-200 shadow-sm rounded-xl p-4 mb-6 flex items-center gap-3">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search by user, email or IP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No IP logs found.</p>
        ) : (
          filtered.map((log) => (
            <IpLogCard
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
              {editMode ? "Edit IP Log" : "Add IP Log"}
            </h2>

            <div className="space-y-3">
              {["user", "email", "ip", "timestamp"].map((field) => (
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

export default TrackIpLogs;
