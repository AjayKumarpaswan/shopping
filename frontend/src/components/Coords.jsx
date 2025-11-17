import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const coordsData = [
  {
    id: 1,
    name: "Quriox",
    description: "Top Pant Co-ords Set",
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/apparel-set/f/k/j/xl-maslin-y-s-co-ords-quriox-original-imahhegunvez5vbx.jpeg?q=70",
    oldPrice: 1499,
    price: 990,
  },
  {
    id: 2,
    name: "SHREE SHUBH ENTERPRISE",
    description: "Top Pant Co-ords Set",
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/e/w/e/s-women-cords-set-shiv-ratna-creation-original-imagupettztskv3r.jpeg?q=70",
    oldPrice: 1998,
    price: 517,
  },
  {
    id: 3,
    name: "xael",
    description:"Top Palazzos Co-ords Set",
    image:"https://rukminim2.flixcart.com/image/612/612/xif0q/apparel-set/e/s/j/s-rubta-pair-01-co-ords-xael-original-imahemfegnpv56yr.jpeg?q=70",
    oldPrice: 2200,
    price: 1799,
  },
  {
    id: 4,
    name: "Tikhi Imli",
    description: "Tunic Pant Co-ords Set",
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/apparel-set/p/r/u/s-co-ords-9137-co-ords-tikhi-imli-original-imah8ey6ucqsqfav.jpeg?q=70",
    oldPrice: 4000,
    price: 3499,
  },
  {
    id: 5,
    name: "Quriox",
    description: "Top Pant Co-ords Set",
    image: "https://rukminim2.flixcart.com/image/612/612/xif0q/apparel-set/c/y/v/l-maslin-w-xl-co-ords-quriox-original-imahheguhhgzfhme.jpeg?q=70",
    oldPrice: 2800,
    price: 2299,
  },
];

const Coords = () => {
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
          Women's Co-ords
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
          {coordsData.slice(0, visibleCount).map((item) => {
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

        {visibleCount < coordsData.length && (
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

export default Coords;
