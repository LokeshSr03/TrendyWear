import React from "react";

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
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
            <li className="text-gray-700">Product</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/500"
              alt="Product"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Modern Chair</h1>

            <p className="text-xl text-gray-600">
              This modern chair is designed to bring elegance to your living
              room. Made with high-quality materials, it offers comfort and
              style.
            </p>

            <p className="text-2xl font-semibold text-green-600">$299</p>

            <div className="flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition">
                Add to Cart
              </button>
              <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition">
                Buy Now
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Product Details
              </h2>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Material: High-quality wood</li>
                <li>Dimensions: 40 x 40 x 90 cm</li>
                <li>Weight: 10 kg</li>
                <li>Color: Brown, Black, White</li>
                <li>Warranty: 1 year</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
