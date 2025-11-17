import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Kurta = () => {

  const kurtaData = [
  {
    id: 1,
    name: "HESVI",
    description: "Women Women Anarkali Gown Kurta Set with Dupatta",
    image: "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/2025/SEPTEMBER/12/w1tkbVRO_1491df2f44274aefa2d04fb6db288eec.jpg",
    oldPrice: 1499,
    price: 990,
  },
  {
    id: 2,
    name: "Besolid",
    description: "Women Khadi Kurta",
    image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/NOVEMBER/1/cQVdcYJr_0e35aee681a7401dbdce7f781030e852.jpg",
    oldPrice: 1998,
    price: 517,
  },
  {
    id: 3,
    name: "MORDEN MUSE",
    description: "Women Paisley Embellished Kantha Work Lace Frills Bows and Ruffles Maternity Anarkali Kurta.",
    image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2025/APRIL/7/bcI52YLi_e973caccdddf4214992797d2799eeefd.jpg",
    oldPrice: 2200,
    price: 1799,
  },
  {
    id: 4,
    name: "CHIRAAI",
    description: "Women Floral Kurta",
    image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/2024/AUGUST/26/VQmfVbWP_d1524285024040f5950df14255c27eae.jpg",
    oldPrice: 4000,
    price: 3499,
  },
  {
    id: 5,
    name: "Threads",
    description: "Women Set Of  Geometric Printed Round Neck Summer Sheers Crepe Kurta.",
    image: "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/19623830/2022/8/23/a97149ff-73a2-4022-9485-d87df1a9c02d1661270104579KaliniWomensCrepeMultiColorDigitalPrintedStraightKurtaPACKOF1.jpg",
    oldPrice: 2800,
    price: 2299,
  },
  // you can add more later
];
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <>
      <Header />
      <div className="bg-[#2c0d0d] pt-24 md:pt-28 px-4 md:px-10 text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Women's Kurtas
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
          {kurtaData.slice(0, visibleCount).map((kurta) => {
            const discount = Math.round(((kurta.oldPrice - kurta.price) / kurta.oldPrice) * 100);
            return (
              <div
                key={kurta.id}
                onClick={() => handleProductClick(kurta)}
                className="cursor-pointer border rounded-lg p-4 bg-white shadow hover:shadow-lg transition duration-300"
              >
                <img
                  src={kurta.image}
                  alt={kurta.name}
                  className="w-full h-64 object-contain rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">{kurta.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{kurta.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400 line-through">₹{kurta.oldPrice}</span>
                  <span className="text-green-600 font-semibold">₹{kurta.price}</span>
                  <span className="text-red-500 text-sm font-medium">{discount}% OFF</span>
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < kurtaData.length && (
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

export default Kurta;
