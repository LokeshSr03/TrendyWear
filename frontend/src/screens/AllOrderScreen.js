import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, cancelOrder } from "../actions/orderActions"; // Redux actions: getOrders and cancelOrder
import {
  MdPending,
  MdCheckCircle,
  MdLocalShipping,
  MdDone,
  MdError,
} from "react-icons/md"; // Icons for status
import { Link } from "react-router-dom";

function AllOrderScreen() {
  const dispatch = useDispatch();

  const orderGet = useSelector((state) => state.orderGet);
  const { orders = [], loading, error } = orderGet;

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const statusIcons = {
    pending: <MdPending className="text-yellow-500 w-5 h-5 mr-1" />,
    paid: <MdCheckCircle className="text-green-500 w-5 h-5 mr-1" />,
    shipped: <MdLocalShipping className="text-blue-500 w-5 h-5 mr-1" />,
    delivered: <MdDone className="text-purple-500 w-5 h-5 mr-1" />,
    cancelled: <MdError className="text-red-500 w-5 h-5 mr-1" />,
  };

  const handleCancelOrder = async (orderId) => {
    await dispatch(cancelOrder(orderId)); // Wait for the cancellation to complete
    dispatch(getOrders()); // Re-fetch the orders after cancelling
  };
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <div className="container mx-auto p-8 mt-16">
      <h1 className="text-5xl font-extrabold text-teal-600 mb-10 text-center tracking-wide">
        All Orders
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full text-gray-500"></div>
          <span className="ml-4 text-xl text-gray-700">Loading...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          <p className="font-medium text-lg">Error: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-xl rounded-lg p-6 border-t-4 border-gradient-to-r from-blue-400 to-purple-500 hover:shadow-2xl transition-shadow duration-300"
            >
              <Link to={`/orders/${order._id}`} className="block mb-4">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                  Order ID: <span className="text-gray-600">{order._id}</span>
                </h2>

                <p className="mb-4 text-gray-700 flex items-center">
                  Status:{" "}
                  <span
                    className={`inline-flex items-center ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "delivered"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-red-100 text-red-700"
                    } px-3 py-1 rounded-full text-sm font-semibold`}
                  >
                    {statusIcons[order.status]} {order.status}
                  </span>
                </p>
              </Link>

              <div className="border-t border-gray-200 py-4">
                <h3 className="font-semibold text-gray-900 mb-4">Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center space-x-4 py-2 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <img
                        src={`${API_URL}/${item.image}`}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-grow">
                        <p className="text-gray-900 font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Total:{" "}
                  <span className="text-3xl text-teal-600 font-extrabold">
                    ₹{order.total_amount.toFixed(2)}
                  </span>
                </h3>
                {order.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancelOrder(order._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrderScreen;
