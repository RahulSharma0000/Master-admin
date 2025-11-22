import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiClock,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiSearch,
} from "react-icons/fi";

const TimelineItem = ({ item, onDelete, onEdit }) => (
  <div className="relative pl-10 pb-10 group">

    {/* Line */}
    <span className="absolute left-[13px] top-0 w-[2px] h-full bg-gray-300"></span>

    {/* Dot */}
    <span className="absolute left-2 top-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow"></span>

    {/* Content Box */}
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4">
      <div className="flex justify-between items-start">

        <div>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.description}</p>

          {/* Meta info */}
          <p className="text-gray-500 text-xs mt-2">
            <FiClock className="inline mr-1" />
            {item.timestamp} 
          </p>
          <p className="text-gray-400 text-xs">IP: {item.ip}</p>
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
  </div>
);

const ActivityTimeline = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const emptyEvent = {
    id: null,
    title: "",
    description: "",
    timestamp: "",
    ip: "",
  };

  const [form, setForm] = useState(emptyEvent);

  /* ---------------- LOAD DEMO DATA ---------------- */
  useEffect(() => {
    setEvents([
      {
        id: 1,
        title: "User Logged In",
        description: "Rahul logged into the master admin portal.",
        timestamp: "2025-11-22 10:22 AM",
        ip: "192.168.1.22",
      },
      {
        id: 2,
        title: "Loan Record Updated",
        description: "Loan EMI updated from 4,100 to 4,500.",
        timestamp: "2025-11-22 09:10 AM",
        ip: "192.168.1.10",
      },
      {
        id: 3,
        title: "Document Deleted",
        description: "Customer KYC document was deleted by Admin.",
        timestamp: "2025-11-21 04:55 PM",
        ip: "192.168.1.77",
      },
    ]);
  }, []);

  /* ---------------- CRUD HANDLERS ---------------- */

  const handleAddNew = () => {
    setForm(emptyEvent);
    setEditMode(false);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editMode) {
      setEvents(events.map((ev) => (ev.id === form.id ? form : ev)));
    } else {
      setEvents([...events, { ...form, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  /* ---------------- SEARCH FILTER ---------------- */

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.timestamp.toLowerCase().includes(search.toLowerCase())
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
            Activity Timeline / Timestamps
          </h1>
          <p className="text-gray-500 text-sm">
            View chronological activity logs with timestamps and IP address.
          </p>
        </div>
      </div>

      {/* ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <FiPlus /> Add Event
        </button>
      </div>

      {/* SEARCH */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 mb-6 flex items-center gap-3">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search by title, activity or timestamp..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* TIMELINE */}
      <div className="relative pl-4">
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No timeline events found.</p>
        ) : (
          filtered.map((item) => (
            <TimelineItem
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
          <div className="bg-white rounded-2xl p-6 shadow-lg w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">
              {editMode ? "Edit Event" : "Add Event"}
            </h2>

            <div className="space-y-3">
              {["title", "description", "timestamp", "ip"].map((field) => (
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

export default ActivityTimeline;
