// AllProducts.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Form state
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    oldPrice: '',
    categoryName: '',
    images: [] // can include both existing and new images
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      isExisting: false, // mark as new upload
    }));
    setForm((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('oldPrice', form.oldPrice);
    formData.append('categoryName', form.categoryName);

    // Append new files only
    form.images
      .filter((img) => !img.isExisting)
      .forEach((img) => formData.append('images', img.file));

    // For editing, send removed existing images
    if (editProduct) {
      const removedImages = editProduct.images.filter(
        (img) => !form.images.some((f) => f.isExisting && f.name === img)
      );
      formData.append('removeImages', JSON.stringify(removedImages));
    }

    try {
      let res;
      if (editProduct) {
        res = await axios.put(
          `http://localhost:5000/api/products/${editProduct._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('Product updated successfully');
      } else {
        res = await axios.post(
          'http://localhost:5000/api/products/',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        alert('Product created successfully');
      }

      setShowModal(false);
      setForm({ name: '', description: '', price: '', oldPrice: '', categoryName: '', images: [] });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to save product');
    }
  };

  const openEditModal = (product) => {
    setEditProduct(product);

    // Map existing images from DB
    const existingImages = product.images.map((img) => ({
      name: img,
      url: `http://localhost:5000/uploads/${img}`,
      isExisting: true,
    }));

    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      oldPrice: product.oldPrice,
      categoryName: product.category?.name || '',
      images: existingImages,
    });

    setShowModal(true);
  };

  return (
    <>
      <Sidebar />

      <div className="flex-1 ml-0 md:ml-64 p-4 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              setEditProduct(null);
              setForm({ name: '', description: '', price: '', oldPrice: '', categoryName: '', images: [] });
              setShowModal(true);
            }}
          >
            Add New Product
          </button>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && products.length === 0 && <p>No products found.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md border flex flex-col">
              <img
                src={`http://localhost:5000/uploads/${product.images[0]}`}
                alt={product.name}
                className="h-full w-48 m-auto object-cover rounded-md mb-3"
              />
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="mt-2 font-medium text-green-600">
                ₹{product.price}{' '}
                <span className="line-through text-gray-400 text-sm ml-2">₹{product.oldPrice}</span>
              </p>
              <p className="text-gray-500 text-sm mt-1">Category: {product.category?.name}</p>

              <div className="mt-3 flex justify-between items-center">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Add/Edit Product */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">{editProduct ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="number"
                  name="oldPrice"
                  placeholder="Old Price"
                  value={form.oldPrice}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  name="categoryName"
                  placeholder="Category Name"
                  value={form.categoryName}
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                  required
                />

                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full border p-2 rounded"
                />

                {/* Preview uploaded & existing images */}
                <div className="flex flex-wrap mt-2 gap-2">
                  {form.images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img.isExisting ? img.url : URL.createObjectURL(img.file)}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full mt-3"
                >
                  {editProduct ? 'Update Product' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
