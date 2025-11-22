// src/pages/masterData/LoanProducts.jsx
import React, { useState, useEffect } from "react";
import MainLayout from "../../layout/MainLayout";
import {
  FiArrowLeft,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { loanProductService } from "../../services/loanProductService";

const LoanProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  // edit mode
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  // Load products
  useEffect(() => {
    setProducts(loanProductService.getProducts());
  }, []);

  const handleAdd = () => {
    if (!newProduct.trim()) return alert("Enter product name");

    loanProductService.addProduct(newProduct);
    setProducts(loanProductService.getProducts());
    setNewProduct("");
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this loan product?")) return;

    loanProductService.deleteProduct(id);
    setProducts(loanProductService.getProducts());
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
  };

  const saveEdit = () => {
    if (!editName.trim()) return alert("Enter name");

    loanProductService.updateProduct(editId, editName);
    setProducts(loanProductService.getProducts());

    setEditId(null);
    setEditName("");
  };

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 border rounded-xl">
          <FiArrowLeft />
        </button>
        <h1 className="text-xl font-semibold">Define Loan Product Types</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border max-w-2xl">
        {/* ADD NEW */}
        <div className="flex gap-3">
          <input
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            placeholder="e.g. Personal Loan, Business Loan"
            className="flex-1 p-3 border rounded-xl"
          />

          <button
            onClick={handleAdd}
            className="px-4 bg-blue-600 text-white rounded-xl flex items-center gap-1"
          >
            <FiPlus /> Add
          </button>
        </div>

        {/* LIST */}
        <div className="mt-6 space-y-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-3 bg-gray-50 rounded-xl flex justify-between items-center"
            >
              {/* Name or edit input */}
              {editId === p.id ? (
                <input
                  className="flex-1 p-2 border rounded-lg"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              ) : (
                <span className="font-medium">{p.name}</span>
              )}

              <div className="flex items-center gap-3">
                {editId === p.id ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="text-green-600 p-2 hover:bg-green-100 rounded-lg"
                    >
                      <FiCheck />
                    </button>
                    <button
                      onClick={() => setEditId(null)}
                      className="text-gray-600 p-2 hover:bg-gray-200 rounded-lg"
                    >
                      <FiX />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(p)}
                    className="text-blue-600 p-2 hover:bg-blue-100 rounded-lg"
                  >
                    <FiEdit3 />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 p-2 hover:bg-red-100 rounded-lg"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-gray-500 text-sm">No products added yet.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default LoanProducts;
