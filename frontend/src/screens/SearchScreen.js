import React from "react";
import { useSearchParams, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../actions/productActions";

const SearchScreen = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const dispatch = useDispatch();
  const productAll = useSelector((state) => state.productAll);
  const { products = [] } = productAll;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;
  const searchProducts = products.filter((product) =>
    product.name.toLowerCase().startsWith(query.toLocaleLowerCase())
  );
  const handleDelete = async (productId) => {
    await dispatch(deleteProduct(productId));
    dispatch(getProducts());
  };
  const API_URL = process.env.REACT_APP_API_URL;

  return (
    <div className="max-w-7xl mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Search Results for: "{query}"
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-600">
            No products found.
          </div>
        )}
        {searchProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <img
              src={`${API_URL}/${product.image}`}
              alt={product.name}
              className="w-full h-60 object-cover rounded-t-md mb-4"
            />
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold mb-2 text-gray-900">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4 text-center">
                {product.description.slice(0, 45)}
              </p>
              <span className="text-teal-600 text-xl font-semibold mb-4">
                ₹{product.price}
              </span>

              {userInfo && userInfo.isAdmin ? (
                <div className=" flex space-x-2">
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button className="bg-teal-600 text-white font-medium px-4 py-2 rounded hover:bg-teal-500 transition duration-300 ease-in-out">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white font-medium px-4 py-2 rounded hover:bg-red-500 transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <Link to={`/product/${product._id}`}>
                  <button className="bg-teal-600 text-white font-medium px-6 py-3 rounded-full hover:bg-teal-500 transition duration-300 ease-in-out">
                    View Details
                  </button>
                </Link>
              )}

              {/* Conditionally show Update and Delete buttons if user is admin */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchScreen;
