import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../actions/productActions";
import { Link } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();
  const productAll = useSelector((state) => state.productAll);
  const { loading, error, products = [] } = productAll;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  // Filter products based on price range
  const filteredProducts = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  const handleDelete = (productId) => {
    // Add delete logic here, possibly dispatching an action
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-center text-teal-600">
          Explore Our Products
        </h1>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-teal-600 text-white px-4 py-2 rounded"
        >
          {showFilter ? "Hide Price Filter" : "Show Price Filter"}
        </button>
      </div>

      {showFilter && (
        <div className="mb-8 flex flex-col items-center md:flex-row md:justify-center">
          <div className="flex items-center mb-4 md:mr-4">
            <label className="mr-2">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              className="border rounded p-2 w-20"
            />
          </div>
          <div className="flex items-center mb-4 md:mr-4">
            <label className="mr-2">Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              className="border rounded p-2 w-20"
            />
          </div>
          <div className="flex flex-col items-center md:flex-row">
            <span>
              Price Range: ₹{minPrice} - ₹{maxPrice}
            </span>
            <input
              type="range"
              min={0}
              max={1000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mx-2 w-full md:w-64"
            />
            <input
              type="range"
              min={0}
              max={1000}
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="mx-2 w-full md:w-64"
            />
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-xl text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-xl text-red-600">
          Error: {error.message}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
              >
                <img
                  src={product.image}
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
            ))
          ) : (
            <p className="text-center text-xl text-gray-600">
              No products found in this price range.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
