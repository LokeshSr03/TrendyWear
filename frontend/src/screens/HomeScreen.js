import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/productActions";
import { Link } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();

  // Get the product state from Redux store
  const productAll = useSelector((state) => state.productAll);
  const { loading, error, products } = productAll;

  // Fetch products when the component mounts or products in Redux store changes
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]); // Runs on component mount, doesn't depend on products

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-16">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-teal-600">
        Explore Our Products
      </h1>

      {loading ? (
        <p className="text-center text-xl text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-600">
          Error: {error.message}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-md mb-6"
              />
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2 text-gray-900">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {product.description}
                </p>
                <span className="text-teal-600 text-xl font-semibold mb-4">
                  ₹{product.price}
                </span>
                <Link to={`/${product._id}`}>
                  <button className="bg-teal-600 text-white font-medium px-6 py-3 rounded-full hover:bg-teal-500 transition duration-300 ease-in-out">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
