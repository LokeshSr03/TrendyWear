import React, { useState } from "react";

function HomeScreen() {
  const [products] = useState([
    {
      id: 1,
      name: "Product 1",
      description: "This is a description for Product 1.",
      price: "$25.00",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      description: "This is a description for Product 2.",
      price: "$30.00",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Product 3",
      description: "This is a description for Product 3.",
      price: "$45.00",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Product 4",
      description: "This is a description for Product 4.",
      price: "$60.00",
      image: "https://via.placeholder.com/150",
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>

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
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            <span className="text-indigo-600 text-lg font-semibold">
              {product.price}
            </span>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition duration-300">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
