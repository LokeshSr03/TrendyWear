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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {product.description}
              </p>
              <span className="text-indigo-600 text-lg font-semibold">
                ₹{product.price}
              </span>
              <Link to={`/${product._id}`}>
                <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition duration-300">
                  Add to Cart
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
