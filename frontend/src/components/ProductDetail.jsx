import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem("user"));

    // Track selected size
    const [selectedSize, setSelectedSize] = useState("");

    // Add to Bag Logic
    const handleAddToBag = () => {
        if (!user) {
            alert("Please login to add items to your bag");
            navigate("/login");
            return;
        }

        if (!selectedSize) {
            alert("Please select a size before adding to bag");
            return;
        }

        dispatch(addToCart({ ...product, selectedSize }));
        alert(`Product added to bag `);
    };

    // Add to Wishlist Logic
    const handleAddToWishlist = () => {
        if (!user) {
            alert("Please login to add items to your wishlist");
            navigate("/login");
            return;
        }

        if (!selectedSize) {
            alert("Please select a size before adding to wishlist");
            return;
        }

        dispatch(addToWishlist({ ...product, selectedSize }));
        alert(`Product added to wishlist`);
        navigate("/wishlist");
    };

    if (!product) {
        return (
            <div>
                <Header />
                <p className="p-8 text-center text-gray-500 text-lg">Product not found</p>
            </div>
        );
    }

    const discount = Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
    );

    return (
        <>
            <Header />
            <div className="pt-24 md:mt-28 px-4 md:px-10 bg-white text-gray-800 min-h-screen">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">

                    {/* Left - Image */}
                    <div className="md:w-1/2 flex justify-center items-center bg-gray-50 p-4 rounded-lg">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-[500px] object-contain rounded-md"
                        />
                    </div>

                    {/* Right - Details */}
                    <div className="md:w-1/2 flex flex-col gap-6">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-gray-600">{product.description}</p>

                        <div className="flex items-center gap-3">
                            <span className="text-xl font-semibold text-green-600">₹{product.price}</span>
                            <span className="line-through text-gray-400">₹{product.oldPrice}</span>
                            <span className="text-red-500 font-medium">{discount}% OFF</span>
                        </div>

                        {/* Sizes */}
                        <div>
                            <h2 className="font-medium text-gray-700 mb-1">Size <span className="text-red-500">*</span></h2>
                            <div className="flex gap-2">
                                {["S", "M", "L", "XL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`border px-4 py-1 rounded hover:bg-gray-100 transition ${
                                            selectedSize === size
                                                ? "border-pink-600 bg-pink-100"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleAddToBag}
                                className="bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700 transition"
                            >
                                Add to Bag
                            </button>

                            <button
                                onClick={handleAddToWishlist}
                                className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
                            >
                                Wishlist
                            </button>
                        </div>

                        {/* Extra Info */}
                        <div className="mt-6 text-gray-500 text-sm space-y-1">
                            <p>✓ 100% Original Products</p>
                            <p>✓ Easy Returns & Refunds</p>
                            <p>✓ Free Delivery above ₹1999</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
