import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

const Lehenga = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  // Fetch Lehenga products dynamically
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/category/Lehenga");
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch Lehenga products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleShowMore = () => setVisibleCount(prev => prev + 5);

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <>
      <Header />
      <div className="bg-[#2c0d0d] pt-24 md:pt-40 px-4 md:px-10 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">Women's Lehenga</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
          {products.slice(0, visibleCount).map((item) => {
            const discount = Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);
            return (
              <div
                key={item._id}
                onClick={() => handleProductClick(item)}
                className="cursor-pointer border rounded-lg p-4 bg-white shadow hover:shadow-lg transition duration-300"
              >
                <img
                  src={item.images && item.images.length > 0 ? `http://localhost:5000/uploads/${item.images[0]}` : "/fallback.jpg"}
                  alt={item.name}
                  className="w-full h-64 object-contain rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400 line-through">₹{item.oldPrice}</span>
                  <span className="text-green-600 font-semibold">₹{item.price}</span>
                  <span className="text-red-500 text-sm font-medium">{discount}% OFF</span>
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < products.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleShowMore}
              className="bg-[#063D2C] text-white px-6 py-2 rounded-md font-medium hover:bg-[#05512f] transition"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Lehenga;
