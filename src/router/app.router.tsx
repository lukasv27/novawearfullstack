import AdminLayout from "@/paginas/components/layouts/AdminLayout";
import LoginForm from "@/paginas/components/pages/login/LoginForm";
import AdminProductsPage from "@/paginas/components/pages/addproductspage/AddProductsPage";

import HomePage from "@/paginas/components/pages/homepage/HomePage";
import LoginPage from "@/paginas/components/pages/login/LoginPage";
import CategoryPage from "@/paginas/components/pages/Productpage/CategoryPage";
import ProductsPage from "@/paginas/components/pages/Productpage/ProductsPage";
import UserRegister from "@/paginas/components/pages/userRegister/UserSignup";

import { createBrowserRouter } from "react-router";

import ShoppingCartPage from "@/paginas/components/pages/shoppingcart/ShoppingCartPage";

export const router = createBrowserRouter([
  { path: "/home", element: <HomePage /> },
  {
    path: "/login",
    element: <LoginPage />,
    children: [{ index: true, element: <LoginForm /> }],
  },
  { path: "/registro", element: <UserRegister /> },
  { path: "/productos", element: <ProductsPage /> },
  { path: "/category/:categoryName", element: <CategoryPage /> },
  { path: "/shoppingcart", element: <ShoppingCartPage /> },
  {
    path: "/administrador",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminProductsPage /> },
      { path: "productos", element: <AdminProductsPage /> },
    ],
  },
]);
