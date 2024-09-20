import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct } from "../actions/productActions";
import { useParams, Link } from "react-router-dom";

const ProductPage = () => {
  const productSingle = useSelector((state) => state.productSingle);
  const { loading, error, product } = productSingle;

  const { id } = useParams();
  const dispatch = useDispatch();

  // Fetch the product details based on the id
  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id, product]);

  return (
    <div className="min-h-screen bg-gray-100 mt-8">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-500 hover:text-gray-900">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700">{product?.name || "Product"}</li>
          </ol>
        </nav>

        {loading ? (
          <div className="flex justify-center">Loading...</div>
        ) : error ? (
          <div className="flex justify-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex justify-center">
              <img
                src={`/${product.image}`}
                alt={product.name}
                className="rounded-lg shadow-lg w-full h-[30rem]"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {product?.name || "Product Name"}
              </h1>

              <p className="text-xl text-gray-600">
                {product?.description ||
                  "This product is designed with the highest quality materials for durability and style."}
              </p>

              <p className="text-2xl font-semibold text-green-600">
                ₹{product?.price || "299"}
              </p>

              {/* Stock Status */}
              <p
                className={`${
                  product?.stock > 0 ? "text-green-600" : "text-red-600"
                } text-lg font-medium`}
              >
                {product?.stock > 0
                  ? `In Stock (${product.stock})`
                  : "Out of Stock"}
              </p>

              <div className="flex space-x-4">
                <Link to={`/products/${id}/cart`}>
                  <button
                    className={`${
                      product?.stock > 0
                        ? "bg-teal-600 text-white"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    } px-4 py-2 rounded-md hover:bg-teal-500 transition`}
                    disabled={product?.stock === 0}
                  >
                    Add to Cart
                  </button>
                </Link>
                <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                  Buy Now
                </button>
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  Product Details
                </h2>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  {product?.details
                    ? product.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))
                    : [
                        "Material: High-quality wood",
                        "Dimensions: 40 x 40 x 90 cm",
                        "Weight: 10 kg",
                        "Color: Brown, Black, White",
                        "Warranty: 1 year",
                      ].map((detail, index) => <li key={index}>{detail}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
