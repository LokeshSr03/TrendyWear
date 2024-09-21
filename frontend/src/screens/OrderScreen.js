import React from "react";
import { useSelector } from "react-redux";

function OrderScreen() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, loading, error } = orderCreate;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Order Details
      </h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 md:w-3/4 mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order ID: <span className="text-gray-500">{order._id}</span>
          </h2>
          <p className="text-gray-700 mb-6">
            Status:{" "}
            <span
              className={`${
                order.status === "pending"
                  ? "bg-yellow-200"
                  : order.status === "paid"
                  ? "bg-green-200"
                  : order.status === "shipped"
                  ? "bg-blue-200"
                  : "bg-red-200"
              } px-2 py-1 rounded-full text-sm font-semibold`}
            >
              {order.status}
            </span>
          </p>

          <div className="border-t-2 border-gray-200 py-4">
            <h3 className="text-lg font-semibold mb-4">Items</h3>
            {order.items.map((item) => (
              <div
                key={item._id}
                className="flex items-center space-x-4 border-b pb-4 mb-4"
              >
                <img
                  src={`/${item.image}`}
                  alt={item.name}
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-500">{item.description}</p>
                  <p className="text-sm">
                    Quantity :
                    <span className="text-gray-600"> {item.quantity}</span>
                  </p>
                  <p className="text-sm">
                    Price : <span className="text-gray-600">₹{item.price}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800 flex justify-center items-center">
              Total Amount :
              <span className="text-xl text-green-500">
                ₹{order.total_amount.toFixed(2)}
              </span>
            </h3>

            {/* Place Order Button */}
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition duration-300"
              onClick={() => alert("Order placed!")}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderScreen;
