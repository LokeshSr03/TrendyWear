import React from "react";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Product 2",
      price: 19.99,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
  ];

  const handleRemove = (id) => {
    // Logic to remove item from cart
    console.log("Remove item with id:", id);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
                      <p className="text-gray-600">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
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
              <button className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
