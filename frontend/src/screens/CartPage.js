import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addCart, removeCart } from "../actions/cartActions";
import { getUserProfile } from "../actions/userActions";
import { createOrder } from "../actions/orderActions";
import { CART_RESET } from "../constants/cartConstants";

const CartPage = () => {
  const { id } = useParams();
  const [address, setAddress] = useState("");
  const [quantity] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userProfile = useSelector((state) => state.userProfile);
  const { user } = userProfile;

  useEffect(() => {
    dispatch(addCart(id, quantity));
    if (user) {
      setAddress(user.address);
    } else {
      dispatch(getUserProfile());
    }
  }, [dispatch, id]);

  const handleRemove = (id) => {
    dispatch(removeCart(id));
  };

  // Calculate total based on quantity
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, quantity) => {
    dispatch(addCart(id, quantity)); // Assuming addCart accepts an optional quantity parameter
  };

  const handleCheckout = () => {
    if (user) {
      const items = cartItems.map((item) => ({
        product_id: item._id, // or item.product_id if it's named differently in the cart
        name: item.name,
        description: item.description,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      }));

      dispatch(createOrder(items, totalPrice));
      navigate(`/cart/checkout`);
      dispatch({ type: CART_RESET });
    } else {
      navigate(`/login?redirect=/cart/checkout`);
    }
  };

  return (
    <div className="container mx-auto p-5 lg:p-10 min-h-screen mt-12">
      <h1 className="text-3xl font-bold mb-5 text-gradient bg-gradient-to-r text-teal-700 bg-clip-text text-transparent">
        Your Cart
      </h1>
      <div className="bg-white shadow-xl rounded-lg p-6 lg:p-10 transition-transform transform">
        {cartItems.length === 0 ? (
          <p className="text-gray-700 text-lg font-medium">
            Your cart is empty!
          </p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`/${item.image}`}
                      alt={item.name}
                      className="w-16 h-16 md:w-32 md:h-32 rounded-lg object-cover shadow-lg"
                    />
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-500">{item.description}</p>
                      <p className="text-gray-600 mt-1">
                        Price: ₹{item.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600">Stock: {item.stock}</p>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item._id, Number(e.target.value))
                        }
                        className="mt-2 block w-full md:w-auto p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        {[...Array(item.stock).keys()].map((qty) => (
                          <option key={qty + 1} value={qty + 1}>
                            {qty + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-5 md:mt-0 flex items-center space-x-4">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Total: ₹{totalPrice.toFixed(2)}
              </h2>

              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-purple-400  to-teal-500 text-white px-6 py-3 mt-5 md:mt-0 rounded-lg shadow hover:from-teal-500 hover:to-purple-400 transition-all"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}

        {/* Address Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Shipping Address
          </h2>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1">
                <label
                  htmlFor="address"
                  className="block text-gray-700 font-medium"
                >
                  Address:
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="mt-2 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
