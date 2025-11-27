import { ShoppingBag, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navbar-client">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-vibrant-pink via-vibrant-purple to-vibrant-orange bg-clip-text text-black">
              NOVA WEAR STORE
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">

            <Button variant="link" className="border-0 focus-visible:ring-0" onClick={() => navigate("/home")}>
              Inicio
            </Button>

            <Button variant="link" className="border-0 focus-visible:ring-0" onClick={() => navigate("/productos")}>
              Productos
            </Button>

            <Button variant="link" className="border-0 focus-visible:ring-0" onClick={() => navigate("/historial de compra")}>
              Historial de compra
            </Button>

          </div>

          {/* Actions */}
          <div className="  flex items-center gap-4  ">
            <Button variant="ghost" size="icon" className="icon_navbar" onClick={() => navigate("/login")}>
              <User className="h-5 w-5" />
            </Button>
            <Button className="icon_navbar"variant="ghost" size="icon" onClick={() => { navigate("/shoppingcart"); }}>
              <ShoppingBag className="h-5 w-5"/>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="icon_navbar"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="#" className="block text-foreground hover:text-primary transition-colors">
              Inicio
            </a>
            <a href="#productos" className="block text-foreground hover:text-primary transition-colors">
              Productos
            </a>
            <a href="#categorias" className="block text-foreground hover:text-primary transition-colors">
              Categorías
            </a>
            <a href="#contacto" className="block text-foreground hover:text-primary transition-colors">
              Contacto
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
