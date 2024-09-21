import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import Header from "./components/Header";
import ProductForm from "./screens/ProductForm";
import ProductPage from "./screens/ProductPage";
import CartPage from "./screens/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product" element={<ProductForm />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/products/:id/cart" element={<CartPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
