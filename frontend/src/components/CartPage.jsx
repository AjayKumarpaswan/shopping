import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // Modal visibility
  const [showModal, setShowModal] = useState(false);

  // User delivery details
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Quantity logic
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item._id] = 1;
      return acc;
    }, {})
  );

  const handleRemove = (_id) => {
    dispatch(removeFromCart(_id));
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[_id];
      return updated;
    });
  };

  const handleQuantityChange = (_id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [_id]: Math.max(1, (prev[_id] || 1) + delta),
    }));
  };

  // ✅ Subtotal calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (quantities[item._id] || 1),
    0
  );

  //=============================
  // ⭐ LOAD SCRIPT
  //=============================
  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  //=============================
  // ⭐ RAZORPAY PAYMENT FUNCTION
  //=============================
  const handleRazorpay = async () => {
    const { name, email, phone, address } = deliveryDetails;

    if (!name || !email || !phone || !address) {
      alert("Please fill all delivery details!");
      return;
    }

    const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!loaded) return alert("Razorpay SDK failed to load.");

    const orderRes = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: subtotal }),
    });

    const orderData = await orderRes.json();

    if (!orderData.success) {
      alert("Failed to create Razorpay order.");
      return;
    }

    const options = {
      key: "rzp_test_RbAGuaW8eICYMe",
      amount: orderData.order.amount,
      currency: "INR",
      name: "Kamakhya Store",
      description: "Order Payment",
      order_id: orderData.order.id,
      prefill: { name, email, contact: phone },
      handler: async function (response) {
        const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          navigate("/order-details", {
            state: { cartItems, deliveryDetails, subtotal, quantities, paymentId: response.razorpay_payment_id },
          });
        } else {
          alert("Payment verification failed!");
        }
      },
      theme: { color: "#F59E0B" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Header />

      <div className="container mx-auto mt-20 md:mt-35 flex gap-8 p-4 lg:flex-row flex-col">
        {/* LEFT SIDE – ITEMS */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-lg space-y-6">
          <h2 className="text-3xl font-bold font-cormorant mb-6 border-b pb-2">Your Cart</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex flex-col md:flex-row justify-between border-b pb-4">
                <div className="flex gap-4">
                  <img src={item.image} className="w-auto h-28 object-cover" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">{item.description}</p>
                    <p className="font-bold mt-1">₹{item.price}</p>
                    <p className="font-bold mt-1">Size:{item.selectedSize}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex border rounded overflow-hidden">
                    <button
                      className="px-3 bg-gray-200"
                      onClick={() => handleQuantityChange(item._id, -1)}
                    >
                      -
                    </button>
                    <span className="px-4">{quantities[item._id]}</span>
                    <button
                      className="px-3 bg-gray-200"
                      onClick={() => handleQuantityChange(item._id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button className="text-red-500" onClick={() => handleRemove(item._id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE – PRICE */}
        <div className="w-full lg:w-1/3 shadow-2xl bg-white p-8 rounded-2xl sticky top-20">
          <h2 className="text-2xl font-bold font-cormorant border-b pb-2">Price Details</h2>

          <div className="flex justify-between mt-4">
            <span>Subtotal ({cartItems.length} items)</span>
            <span className="font-bold">₹{subtotal}</span>
          </div>

          <div className="flex justify-between mt-2">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full mt-6 py-3 bg-yellow-500 text-white rounded-xl text-lg font-semibold"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* DELIVERY DETAILS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-xl w-11/12 md:w-1/2 p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-700"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-4">Delivery Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={deliveryDetails.name}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={deliveryDetails.email}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={deliveryDetails.phone}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-3"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={deliveryDetails.address}
              onChange={handleInputChange}
              className="w-full border p-2 rounded mb-3"
            ></textarea>

            <button
              onClick={handleRazorpay}
              className="w-full py-3 bg-pink-600 text-white rounded-xl text-lg"
            >
              Pay ₹{subtotal}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
