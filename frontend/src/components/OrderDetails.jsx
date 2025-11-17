import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

const OrderDetails = () => {
    const { state } = useLocation();
    console.log("Order Details State:", state);
    if (!state) return <p>No order found</p>;

    const { cartItems, deliveryDetails, subtotal, paymentId, quantities } = state;

    /* 
    --------------------------------------------------------
      ✅ CALL BACKEND API LIKE YOUR /send-booking-confirmation  
    --------------------------------------------------------
    */
    useEffect(() => {
        const sendOrderNotification = async () => {
            try {
                await axios.post(
                    "http://localhost:5000/api/send-order-confirmation",
                    {
                        cartItems,
                        deliveryDetails,
                        subtotal,
                        paymentId,
                        quantities,
                    }
                );

                console.log("📩 Order confirmation sent via Email + WhatsApp!");
            } catch (err) {
                console.error("❌ Error sending order confirmation:", err);
            }
        };

        if (deliveryDetails?.email) {
            sendOrderNotification();
        }
    }, [cartItems, deliveryDetails, subtotal, paymentId, quantities]);

    return (
        <>
            <Header />

            <div className="pt-24 md:mt-20 px-4 md:px-10 bg-[#f7f7f7] min-h-screen text-gray-800">

                {/* Title */}
                <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* LEFT SECTION */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Delivery Details */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>

                            <div className="space-y-1 text-gray-700">
                                <p><span className="font-semibold">Name:</span> {deliveryDetails.name}</p>
                                <p><span className="font-semibold">Email:</span> {deliveryDetails.email}</p>
                                <p><span className="font-semibold">Phone:</span> {deliveryDetails.phone}</p>
                                <p><span className="font-semibold">Address:</span> {deliveryDetails.address}</p>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h2 className="text-xl font-semibold mb-4">Ordered Products</h2>

                            <div className="divide-y">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-auto h-20 object-cover rounded-md border"
                                            />
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-sm text-gray-600">Qty: {quantities[item.id]}</p>
                                                <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                                            </div>
                                        </div>

                                        <p className="font-semibold text-lg">₹{item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SECTION */}
                    <div>
                        <div className="bg-white p-6 rounded-xl shadow-lg border sticky top-28">
                            <h2 className="text-xl font-semibold pb-3 border-b">Price Details</h2>

                            <div className="py-4 space-y-3 text-gray-700">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p className="font-medium">₹{subtotal}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Delivery Charges</p>
                                    <p className="font-medium text-green-600">FREE</p>
                                </div>

                                <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                                    <p>Total Amount</p>
                                    <p>₹{subtotal}</p>
                                </div>

                                <div className="mt-4 text-sm">
                                    <p className="font-semibold">Payment ID:</p>
                                    <p className="text-gray-600">{paymentId}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
};

export default OrderDetails;
