import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import axios from "axios";

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("Product details:", location.state);
    const user = JSON.parse(localStorage.getItem("user"));

    // Track currently displayed product
    const [currentProduct, setCurrentProduct] = useState(location.state?.product);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");

    // Reset selected size when current product changes
    useEffect(() => {
        setSelectedSize("");
    }, [currentProduct]);

    // Fetch related products whenever current product changes
    useEffect(() => {
        if (!currentProduct) return;

        const fetchRelated = async () => {
            try {
                // Use category name if available, else fallback to ID
                const categoryName =
                    currentProduct.category?.name || currentProduct.category;

                const res = await axios.get(
                    `http://localhost:5000/api/products/category/${categoryName}`
                );

                // Exclude the current product
                const filtered = res.data.filter((p) => p._id !== currentProduct._id);
                setRelatedProducts(filtered);
            } catch (error) {
                console.log("Related Products Fetch Error:", error);
            }
        };

        fetchRelated();
    }, [currentProduct]);

    if (!currentProduct) {
        return (
            <div>
                <Header />
                <p className="p-8 text-center text-gray-500 text-lg">Product not found</p>
            </div>
        );
    }

    const discount = Math.round(
        ((currentProduct.oldPrice - currentProduct.price) / currentProduct.oldPrice) * 100
    );

    // Add to Bag
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

        const productWithImage = {
            ...currentProduct,
            selectedSize,
            image:
                currentProduct.images && currentProduct.images.length > 0
                    ? `http://localhost:5000/uploads/${currentProduct.images[0]}`
                    : "/fallback.jpg",
        };

        dispatch(addToCart(productWithImage));
        alert("Product added to bag");
    };

    // Add to Wishlist
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

        const productWithImage = {
            ...currentProduct,
            selectedSize,
            image:
                currentProduct.images && currentProduct.images.length > 0
                    ? `http://localhost:5000/uploads/${currentProduct.images[0]}`
                    : "/fallback.jpg",
        };

        dispatch(addToWishlist(productWithImage));
        alert("Product added to wishlist");
        navigate("/wishlist");
    };

    // Render related product card
    const renderCard = (item) => {
        const itemDiscount = Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100);

        return (
            <div
                key={item._id}
                onClick={() => {
                    // Ensure clicked item keeps category as object or previous category
                    const newCurrent = {
                        ...item,
                        category:
                            typeof item.category === "object"
                                ? item.category
                                : currentProduct.category, // fallback to previous category
                    };

                    // Move clicked item to main product
                    setCurrentProduct(newCurrent);

                    // Move previous main product to related products
                    const updatedRelated = relatedProducts.filter((p) => p._id !== item._id);
                    updatedRelated.unshift(currentProduct);
                    setRelatedProducts(updatedRelated);

                    // Scroll to top
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }}
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

                <div className="p-3 text-center">
                    <h3 className="text-base font-medium truncate">{item.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{item.description}</p>

                    <div className="flex justify-center gap-2">
                        <span className="font-semibold">₹{item.price}</span>
                        <span className="line-through text-gray-400 text-sm">₹{item.oldPrice}</span>
                        <span className="text-green-600 text-sm">{itemDiscount}% OFF</span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">(Incl. of all taxes)</p>
                </div>
            </div>
        );
    };

    return (
        <>
            <Header />
            <div className="pt-24 md:mt-28 px-4 md:px-10 bg-white text-gray-800 min-h-screen">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                    {/* Left - Image */}
                    <div className="md:w-1/2 flex justify-center items-center bg-gray-50 p-4 rounded-lg">
                        <img
                            src={
                                currentProduct.images && currentProduct.images.length > 0
                                    ? `http://localhost:5000/uploads/${currentProduct.images[0]}`
                                    : "/fallback.jpg"
                            }
                            alt={currentProduct.name}
                            className="w-full h-[500px] object-contain rounded-md"
                        />
                    </div>

                    {/* Right - Details */}
                    <div className="md:w-1/2 flex flex-col gap-6">
                        <h1 className="text-3xl font-bold">{currentProduct.name}</h1>
                        <p className="text-gray-600">{currentProduct.description}</p>

                        <div className="flex items-center gap-3">
                            <span className="text-xl font-semibold text-green-600">₹{currentProduct.price}</span>
                            <span className="line-through text-gray-400">₹{currentProduct.oldPrice}</span>
                            <span className="text-red-500 font-medium">{discount}% OFF</span>
                        </div>

                        {/* Sizes */}
                        <div>
                            <h2 className="font-medium text-gray-700 mb-1">
                                Size <span className="text-red-500">*</span>
                            </h2>
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

                {/* Related Products */}
                <div className="mt-16 px-6">
                    <h2 className="text-2xl font-bold mb-6 text-center">Related Products</h2>

                    {relatedProducts.length === 0 ? (
                        <p className="text-gray-500 text-center">No related products found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => renderCard(item))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
