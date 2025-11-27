import { createRoot } from "react-dom/client";
import { CartProvider } from "./paginas/components/CartProvider";
import "./index.css";
import { RouterProvider } from "react-router-dom"; // ✅ Importa RouterProvider
import { router } from "./router/app.router"; // tu archivo con createBrowserRouter
import { Toaster } from "sonner";
import HomePage from "./paginas/components/pages/homepage/HomePage";

createRoot(document.getElementById("root")!).render(
  <>
    <Toaster richColors position="top-right" />
    
    <CartProvider>
      
      <RouterProvider router={router} /> {/* ✅ Usa RouterProvider */}
    </CartProvider>
  </>
);
