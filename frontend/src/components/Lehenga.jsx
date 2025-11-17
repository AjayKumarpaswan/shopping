import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const lehengaData = [
  {
    id: 1,
    name: "ANJANI TEXTILE",
    description: "Embroidered Semi-Stitched Lehenga & Unstitched Blouse With Dupatta",
    image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/FEBRUARY/7/dUUDuFTn_9f678e1c0f90432a86810776b4563a6b.jpg",
    oldPrice: 1499,
    price: 990,
  },
  {
    id: 2,
    name: "Miss Ethnik",
    description: "Embroidered Thread Work Ready to Wear Lehenga & Blouse With Dupatta",
    image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2024/SEPTEMBER/25/Qux1sQ2m_7f3e14d778534681955acef10dfac282.jpg",
    oldPrice: 1998,
    price: 517,
  },
  {
    id: 3,
    name: "Ambraee",
    description:"Printed Ready to Wear Lehenga & Blouse With Dupatta",
    image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/APRIL/3/WSXnBSAV_40511582ebe44f34af29b234f03bd326.jpg",
    oldPrice: 2200,
    price: 1799,
  },
  {
    id: 4,
    name: "indo street",
    description: "Embellished Sequinned Ready To Wear Lehenga & Blouse With Dupatta",
    image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/OCTOBER/22/MGzpuWkD_915414c614a5465d8d3df48af6dde450.jpg",
    oldPrice: 4000,
    price: 3499,
  },
  {
    id: 5,
    name: "Mr Y",
    description: "Printed Thread Work Semi-Stitched Lehenga & Unstitched Blouse With Dupatta",
    image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/JUNE/24/y3FS2uB0_147ebee2c7194da8bec80663e2b6f6c4.jpg",
    oldPrice: 2800,
    price: 2299,
  },
];

const Lehenga = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => setVisibleCount((prev) => prev + 5);

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <>
      <Header />
      <div className="bg-[#2c0d0d] pt-24 md:pt-28 px-4 md:px-10 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Women's Lehenga
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
          {lehengaData.slice(0, visibleCount).map((item) => {
            const discount = Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);
            return (
              <div
                key={item.id}
                onClick={() => handleProductClick(item)}
                className="cursor-pointer border rounded-lg p-4 bg-white shadow hover:shadow-lg transition duration-300"
              >
                <img
                  src={item.image}
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

        {visibleCount < lehengaData.length && (
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
