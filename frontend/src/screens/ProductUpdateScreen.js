import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductUpdateScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component state for form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  // Get product details from Redux store
  const productAll = useSelector((state) => state.productAll);
  const { loading, error, products } = productAll;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: updateLoading, error: updateError, success } = productUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!products || !products.find((prod) => prod._id === id)) {
        dispatch(getProducts());
      } else {
        const product = products.find((prod) => prod._id === id);
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setStock(product.stock);
      }
    }
  }, [dispatch, id, products, success, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProduct(id, name, description, price, stock));
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Edit Product</h1>

      {loading || updateLoading ? (
        <div className="flex justify-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error || updateError ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error || updateError}</span>
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 p-2 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="border border-gray-300 p-2 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="price" className="font-medium">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="border border-gray-300 p-2 rounded-md"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="stock" className="font-medium">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              className="border border-gray-300 p-2 rounded-md"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Update Product
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductUpdateScreen;
