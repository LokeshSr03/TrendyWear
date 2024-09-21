import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../actions/orderActions"; // Assuming you have a Redux action to fetch orders

function AllOrderScreen() {
  const dispatch = useDispatch();

  const orderGet = useSelector((state) => state.orderGet); // Assuming you have an orderList in Redux state
  const { orders = [], loading, error } = orderGet;
  console.log(orders);

  useEffect(() => {
    dispatch(getOrders()); // Fetch orders when component loads
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        All Orders
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-6 border-t-4 border-blue-500 hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-lg font-semibold mb-2">
                Order ID: <span className="text-gray-500">{order._id}</span>
              </h2>

              <p className="mb-2">
                Status:{" "}
                <span
                  className={`${
                    order.status === "pending"
                      ? "bg-yellow-200"
                      : order.status === "paid"
                      ? "bg-green-200"
                      : order.status === "shipped"
                      ? "bg-blue-200"
                      : order.status === "delivered"
                      ? "bg-purple-200"
                      : "bg-red-200"
                  } px-2 py-1 rounded-full text-sm font-semibold`}
                >
                  {order.status}
                </span>
              </p>

              <div className="border-t border-gray-200 py-4">
                <h3 className="font-semibold text-gray-800">Items</h3>
                {order.items.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex items-center space-x-4 border-b pb-2 mb-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        Price: ${item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Total:{" "}
                  <span className="text-xl text-green-500">
                    ${order.total_amount.toFixed(2)}
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrderScreen;
