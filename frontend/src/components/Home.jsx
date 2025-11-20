import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Carousel from "./Carousel";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [kurtas, setKurtas] = useState([]);
  const [lehengas, setLehengas] = useState([]);
  const [coords, setCoords] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [kurtasRes, lehengasRes, coordsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products/category/Kurta"),
          axios.get("http://localhost:5000/api/products/category/Lehenga"),
          axios.get("http://localhost:5000/api/products/category/Coords"),
        ]);

       setKurtas(kurtasRes.data.slice(0, 3));
setLehengas(lehengasRes.data.slice(0, 3));
setCoords(coordsRes.data.slice(0, 3));

      } catch (error) {
        console.log("Home Fetch Error:", error);
      }
    };

    fetchAll();
  }, []);

  // On product click → go to product details page
  const handleProductClick = (item) => {
    navigate(`/product/${item._id}`, { state: { product: item } });
  };

  // Reuse card design exactly like your static UI
  const renderProductCard = (item) => {
    const discount = Math.round(
      ((item.oldPrice - item.price) / item.oldPrice) * 100
    );

    return (
      <div
        onClick={() => handleProductClick(item)}
        className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer"
      >
        <div className="w-full h-64 bg-white flex items-center justify-center">
          <img
            src={
              item.images && item.images.length > 0
                ? `http://localhost:5000/uploads/${item.images[0]}`
                : "/fallback.jpg"
            }
            alt={item.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-3 justify-center items-center text-center">
          <h3 className="text-base font-medium text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{item.description}</p>

          <div className="flex items-center justify-center text-center gap-2">
            <span className="font-semibold text-gray-900">₹{item.price}</span>
            <span className="line-through text-gray-400 text-sm">
              ₹{item.oldPrice}
            </span>
            <span className="text-green-600 text-sm">
              {discount}% OFF
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">(Incl. of all taxes)</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />

      <main className="bg-[#2c0d0d] min-h-screen text-white">

        {/* HERO SECTION stays exactly the same */}
        <section className="relative flex flex-col md:flex-row items-stretch justify-between bg-[#2c0d0d] text-[#d5c0a5] py-20 px-6 md:px-24 md:mt-20 mt-20 overflow-hidden">
          <div className="flex-1 flex flex-col justify-center max-w-xl z-10 text-left md:pr-16">
            <h2 className="text-4xl md:text-6xl font-cormorant font-bold leading-tight mb-8">
              THE HOUSE <br />
              <span className="md:ml-30 ml-20">OF</span> <br />
              <span className="text-[#e7d4b5] font-cormorant">KAMAKHYA</span>
            </h2>

            <p className="italic font-poppins text-lg md:text-xl mb-6 text-[#e7d4b5]/90">
              Where Culture Meets Couture
            </p>

            <p className="text-base md:text-lg leading-relaxed text-[#e7d4b5]/80 mb-10 font-poppins">
              Celebrating the beauty of tradition with the power of modern design.
            </p>

            <button className="border border-[#d5c0a5] text-[#d5c0a5] px-8 py-3 rounded-full hover:bg-[#d5c0a5] hover:text-[#3b0f0f] transition-all duration-300 shadow-md self-start">
              Explore Marikit Collection
            </button>
          </div>

          <div className="flex-1 relative flex items-center justify-center md:ml-24 mt-4">
            <div className="absolute -bottom-11 left-18 w-95 h-80 bg-[#d5c0a5]"></div>
            <div className="relative z-10 w-full max-w-sm h-full flex items-center justify-center">
              <img
                src="https://rukminim2.flixcart.com/image/612/612/xif0q/apparel-set/p/r/u/s-co-ords-9137-co-ords-tikhi-imli-original-imah8ey6ucqsqfav.jpeg?q=70"
                alt="Kamakhya Collection"
                className="h-[480px] w-auto border-3 border-[#3b0f0f] shadow-2xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* OUR STORY (unchanged) */}
        <section className="relative bg-[#2c0d0d] text-[#e7d4b5] py-24 px-6 md:px-32 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('/silk-texture.jpg')] bg-cover bg-center"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-cormorant font-bold mb-8">
              Our Story
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-10 font-light font-poppins">
              The House of Kamakhya is about celebrating the cultural richness...
            </p>
            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-semibold tracking-wide font-cormorant">
                THE HOUSE OF KAMAKHYA
              </h3>
              <p className="italic text-md mt-2">Where Culture Meets Couture</p>
            </div>
          </div>
        </section>

        {/* KURTAS */}
        <section className="px-6 py-20 mt-10 md:mt-20">
          <h2 className="text-2xl font-semibold text-center text-[#e7d4b5] mb-6">
            All Kurtas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {kurtas.map((item) => renderProductCard(item))}
          </div>
        </section>

        {/* LEHENGAS */}
        <section className="px-6 py-10">
          <h2 className="text-2xl font-semibold text-center text-[#e7d4b5] mb-6">
            All Lehengas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {lehengas.map((item) => renderProductCard(item))}
          </div>
        </section>

        {/* CO-ORDS */}
        <section className="px-6 py-10">
          <h2 className="text-2xl font-semibold text-center text-[#e7d4b5] mb-6">
            All Co-ords
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {coords.map((item) => renderProductCard(item))}
          </div>
        </section>

      </main>
    </>
  );
};

export default Home;
