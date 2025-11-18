import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const showAlert = (type, message) => {
  setAlert({ show: true, type, message });

  setTimeout(() => {
    setAlert({ show: false, type: "", message: "" });
  }, 3000); // Hide after 3 seconds
};



  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const API_URL = "http://localhost:5000/api/categories";

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(API_URL);
      setCategories(res.data);
    } catch (err) {
      console.log("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle Add Category
  const handleAdd = async () => {
  try {
    await axios.post(API_URL, form);
    setShowAddModal(false);
    setForm({ name: "", description: "" });
    fetchCategories();

    showAlert("success", "Category added successfully!");
  } catch (err) {
    showAlert("error", "Failed to add category!");
  }
};


  // Handle Edit Category
  const handleEdit = async () => {
  try {
    await axios.put(`${API_URL}/${selectedCategory._id}`, form);
    setShowEditModal(false);
    fetchCategories();

    showAlert("success", "Category updated successfully!");
  } catch (err) {
    showAlert("error", "Failed to update category!");
  }
};


  // Handle Delete Category
 const handleDelete = async () => {
  try {
    await axios.delete(`${API_URL}/${selectedCategory._id}`);
    setShowDeleteModal(false);
    fetchCategories();

    showAlert("success", "Category deleted successfully!");
  } catch (err) {
    showAlert("error", "Failed to delete category!");
  }
};


  return (
    <>
      <Sidebar />
     {alert.show && (
  <div
    className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg text-white z-50
      transform transition-all duration-500 ease-out
      ${alert.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
      ${alert.type === "success" ? "bg-green-600" : "bg-red-600"}
    `}
  >
    {alert.message}
  </div>
)}


      <div className="flex-1 ml-0 md:ml-64 p-6 bg-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">All Categories</h1>

          <button
            onClick={() => {
              setForm({ name: "", description: "" });  // <-- RESET FORM
              setShowAddModal(true);
            }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
          >
            + Add New Category
          </button>

        </div>

        {/* Loading */}
        {loading && <p className="text-center text-gray-600 text-lg">Loading...</p>}

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-800">{cat.name}</h2>
              <p className="text-gray-600 mt-1 text-sm">{cat.description}</p>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory(cat);
                    setForm(cat);
                    setShowEditModal(true);
                  }}
                  className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowDeleteModal(true);
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------- ADD MODAL ---------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start md:pt-30 pt-60 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">

            <h2 className="text-xl font-bold mb-4">Add Category</h2>

            <input
              type="text"
              placeholder="Category Name"
              className="w-full p-2 border rounded mb-3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded mb-3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ---------------------- EDIT MODAL ---------------------- */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start md:pt-30 pt-60 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">

            <h2 className="text-xl font-bold mb-4">Edit Category</h2>

            <input
              type="text"
              placeholder="Category Name"
              className="w-full p-2 border rounded mb-3"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded mb-3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-yellow-600 text-white rounded"
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ---------------------- DELETE CONFIRM MODAL ---------------------- */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start md:pt-30 pt-60 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">

            <h2 className="text-xl font-bold mb-4">Delete Category?</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete <b>{selectedCategory?.name}</b>?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

    </>
  );
};

export default AllCategory;
