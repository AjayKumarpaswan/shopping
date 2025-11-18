import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

const AllOrders = () => {

     const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders/all');
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setError('Failed to fetch orders');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong!');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
 <Sidebar/>

 <div className='flex-1 ml-0 md:ml-64 p-2  min-h-screen text-center'>
    <h1 className="text-2xl font-bold mb-4">All Orders</h1>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && orders.length === 0 && <p>No orders found.</p>}

        {/* Table for medium and above screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">Order ID</th>
                <th className="py-2 px-4 text-left">Customer</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">Payment ID</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Products</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">{order.deliveryDetails.name}</td>
                  <td className="py-2 px-4">{order.deliveryDetails.email}</td>
                  <td className="py-2 px-4">₹{order.subtotal}</td>
                  <td className="py-2 px-4">{order.paymentId}</td>
                  <td className="py-2 px-4 text-blue-600">{order.status}</td>
                  <td className="py-2 px-4">
                    <ul className="list-disc list-inside">
                      {order.cartItems.map((item) => (
                        <li key={item._id}>
                          {item.name} (Qty: {order.quantities[item._id]})
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for mobile screens */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md border">
              <p className="font-semibold">Order ID: <span className="font-normal">{order._id}</span></p>
              <p className="font-semibold">Customer: <span className="font-normal">{order.deliveryDetails.name}</span></p>
              <p className="font-semibold">Email: <span className="font-normal">{order.deliveryDetails.email}</span></p>
              <p className="font-semibold">Total: <span className="font-normal">₹{order.subtotal}</span></p>
              <p className="font-semibold">Payment ID: <span className="font-normal">{order.paymentId}</span></p>
              <p className="font-semibold">Status: <span className="text-blue-600">{order.status}</span></p>
              <div className="mt-2">
                <p className="font-semibold">Products:</p>
                <ul className="list-disc list-inside">
                  {order.cartItems.map((item) => (
                    <li key={item._id}>
                      {item.name} (Qty: {order.quantities[item._id]})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
 </div>
    </>
  )
}

export default AllOrders