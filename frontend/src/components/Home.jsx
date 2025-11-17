import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";

import kurta1 from "/Kurta/1.webp";
import kurta2 from "/Kurta/2.jpg";
import kurta3 from "/Kurta/3.jpg";
import lehenga1 from "/Lehenga/1.webp";
import lehenga2 from "/Lehenga/2.jpg";
import lehenga3 from "/Lehenga/3.avif";
import Coords1 from "/Co-ords/1.jpg";
import Coords2 from "/Co-ords/2.jpg";
import Coords3 from "/Co-ords/3.jpg";

const Home = () => {
  const Kurtas = [
    {
      name: "Sehra Heer Ajrak Kurta",
      desc: "Ajrak Hand Block Printed Straight Cotton Kurta",
      price: 1679.2,
      oldPrice: 2099,
      discount: 20,
      image: kurta1,
    },
    {
      name: "Nasrine Rabiya Sanganeri Kurta",
      desc: "Blue Hand Block Printed Straight Cotton Kurta",
      price: 1505,
      oldPrice: 2150,
      discount: 30,
      image: kurta2,
    },
    {
      name: "Nasrine Rabiya Sanganeri Kurta",
      desc: "Women's Royal Blue Kurta Set With Organza Dupatta",
      price: 2450,
      oldPrice: 3500,
      discount: 30,
      image: kurta3,
    },
  ];

  const Lehengas = [
    {
      name: "Bunaai Lehenga",
      desc: "Bunaai Baby Pink Handpainted Lehenga Set",
      price: 4500,
      oldPrice: 7000,
      discount: 35,
      image: lehenga1,
    },
    {
      name: "Peach Banarasi silk lehenga saree",
      desc: "Banarasi Jacquard Silk Lehenga Choli",
      price: 3600,
      oldPrice: 6000,
      discount: 40,
      image: lehenga2,
    },
    {
      name: "Azeera",
      desc: "Aarvi Embroidered Brindal Lehenga set",
      price: 2450,
      oldPrice: 3500,
      discount: 30,
      image: lehenga3,
    },
  ];

  const Co_ords = [
    {
      name: "Nayo",
      desc: "Women Floral Printed Co-Ord Set",
      price: 2499,
      oldPrice: 2499,
      discount: 0,
      image: Coords1,
    },
    {
      name: "SHOWOFF",
      desc: "Women Printed V-Neck Co-Ords",
      price: 4595,
      oldPrice: 4595,
      discount: 0,
      image: Coords2,
    },
    {
      name: "W",
      desc: "Floral Printed Regular Gotta Patti Kurta with Palazzo",
      price: 3999,
      oldPrice: 3999,
      discount: 0,
      image: Coords3,
    },
  ];

  const renderProductCard = (item) => (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all">
      <div className="w-full h-64 bg-white flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-3 justify-center items-center text-center">
        <h3 className="text-base font-medium text-gray-900 truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">{item.desc}</p>

        <div className="flex items-center justify-center text-center gap-2">
          <span className="font-semibold text-gray-900">₹{item.price}</span>
          <span className="line-through text-gray-400 text-sm">
            ₹{item.oldPrice}
          </span>
          <span className="text-green-600 text-sm">{item.discount}% OFF</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">(Incl. of all taxes)</p>
      </div>
    </div>
  );

  return (
    <>
      <Header />

      <main className="bg-[#2c0d0d] min-h-screen text-white">
        {/* 🌟 Premium Hero Section */}
        <section className="relative flex flex-col md:flex-row items-stretch  justify-between bg-[#2c0d0d] text-[#d5c0a5] py-20 px-6 md:px-24 md:mt-20 mt-20 overflow-hidden">
          {/* Left Text Section */}
          <div className="flex-1 flex flex-col justify-center max-w-xl z-10 text-left md:pr-16">
            <h2 className="text-4xl md:text-6xl font-cormorant font-bold leading-tight mb-8">
              THE HOUSE <br /><span className="md:ml-30  ml-20">OF</span>  <br />
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

          {/* Right Image Section */}
          <div className="flex-1 relative flex items-center justify-center md:ml-24 mt-4">
            <div className="absolute -bottom-11  left-18 w-95 h-80 bg-[#d5c0a5] "></div>
            <div className="relative z-10 w-full max-w-sm h-full flex items-center justify-center">
              <img
                src="https://rukminim2.flixcart.com/image/612/612/xif0q/apparel-set/p/r/u/s-co-ords-9137-co-ords-tikhi-imli-original-imah8ey6ucqsqfav.jpeg?q=70"
                alt="Kamakhya Collection"
                className="h-[480px] w-auto  border-3 border-[#3b0f0f] shadow-2xl object-cover"
              />
            </div>
          </div>

          {/* Optional Silk Overlay */}
          {/* <div className="absolute inset-0 opacity-10 bg-[url('/silk-texture.jpg')] bg-cover bg-center"></div> */}
        </section>

        {/* 🌸 Our Story Section */}
        <section className="relative bg-[#2c0d0d] text-[#e7d4b5] py-24 px-6 md:px-32 text-center overflow-hidden">
          {/* Soft silk background overlay */}
          <div className="absolute inset-0 opacity-20 bg-[url('/silk-texture.jpg')] bg-cover bg-center"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-cormorant font-bold  mb-8">
              Our Story
            </h2>

            <p className="text-lg md:text-xl leading-relaxed mb-10 font-light font-poppins">
              The House of Kamakhya is about celebrating the cultural richness of India
              while crafting clothing that feels timeless yet modern. The name Kamakhya
              symbolizes feminine grace, strength, and creativity — bringing together
              tradition and contemporary design in perfect harmony.
            </p>

            <div className="mt-8">
              <h3 className="text-lg md:text-xl font-semibold tracking-wide font-cormorant">
                THE HOUSE OF KAMAKHYA
              </h3>
              <p className="italic text-md  mt-2">
                Where Culture Meets Couture
              </p>
            </div>
          </div>
        </section>




        {/* 🌸 Kurta Section */}
        <section className="px-6 py-20 mt-10 md:mt-20">
          <h2 className="text-2xl font-semibold text-center text-[#e7d4b5] mb-6">
            All Kurtas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {Kurtas.map((item, index) => (
              <React.Fragment key={index}>{renderProductCard(item)}</React.Fragment>
            ))}
          </div>
        </section>

        {/* 🌸 Lehenga Section */}
        <section className="px-6 py-10">
          <h2 className="text-2xl font-semibold text-center text-[#e7d4b5] mb-6">
            All Lehengas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {Lehengas.map((item, index) => (
              <React.Fragment key={index}>{renderProductCard(item)}</React.Fragment>
            ))}
          </div>
        </section>

        {/* 🌸 Co-ords Section */}
        <section className="px-6 py-10">
          <h2 className="text-2xl font-semibold text-center text-[#e7d4b5] mb-6">
            All Co-ords
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {Co_ords.map((item, index) => (
              <React.Fragment key={index}>{renderProductCard(item)}</React.Fragment>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
