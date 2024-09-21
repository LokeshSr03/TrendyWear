import React from "react";

const CheckoutPage = () => {
  const shippingAddress = {
    name: "John Doe",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  };

  const totalPrice = 99.99; // Example total price

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 mt-12">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <p>{shippingAddress.name}</p>
          <p>{shippingAddress.address}</p>
          <p>
            {shippingAddress.city}, {shippingAddress.state}{" "}
            {shippingAddress.zip}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          <div className="flex justify-between">
            <span>Total Price:</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-300">
          Complete Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
