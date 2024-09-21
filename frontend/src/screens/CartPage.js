import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addCart, removeCart, removeCartItem } from "../actions/cartActions";

const CartPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(addCart(id));
  }, [dispatch, id]);

  const handleRemove = (id) => {
    dispatch(removeCart(id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Handle checkout logic here (e.g., redirect to checkout page)
    console.log("Checkout clicked");
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-5">
        {cartItems.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between p-4 border-b"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded mr-4"
                    />
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-gray-600">
                        Price: ${item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600">Stock: {item.stock}</p>
                      <select
                        value={item.quantity}
                        onChange={(e) => {
                          // Handle quantity change
                        }}
                        className="mt-2 p-1 border"
                      >
                        {[...Array(item.stock).keys()].map((qty) => (
                          <option key={qty + 1} value={qty + 1}>
                            {qty + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-between items-center">
              <h2 className="text-lg font-bold">
                Total: ${totalPrice.toFixed(2)}
              </h2>
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition"
              >
                Checkout
              </button>
            </div>
          </>
        )}
        {/* Address section */}
        <div className="mt-5">
          <h2 className="text-lg font-bold mb-3">Address Details</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                className="border p-1"
                // Add onChange and value handlers as needed
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                className="border p-1"
                // Add onChange and value handlers as needed
              />
            </div>
            <div className="mb-3">
              <label htmlFor="zipcode">Zip Code:</label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                className="border p-1"
                // Add onChange and value handlers as needed
              />
            </div>
            {/* Add more fields as needed (e.g., state, country) */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
