import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleMoveToBag = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
    alert("Product moved to bag");
    navigate("/cart");
  };

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 min-h-screen md:mt-34">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-cormorant text-gray-800 border-b pb-4">
          My Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-500 text-lg text-center mt-10">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 object-contain rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base line-clamp-2">
                    {item.description}
                  </p>
                  {item.selectedSize && (
    <p className="text-gray-700 font-medium text-sm">
      Size: <span className="text-pink-600">{item.selectedSize}</span>
    </p>
  )}
                  <p className="text-green-600 font-bold text-lg mt-1">
                    ₹{item.price}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleMoveToBag(item)}
                    className="flex-1 bg-pink-600 text-white py-2 rounded-xl font-medium text-sm md:text-base hover:bg-pink-700 transition"
                  >
                    Move to Bag
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="flex-1 border border-gray-300 py-2 rounded-xl font-medium text-sm md:text-base hover:bg-gray-100 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
