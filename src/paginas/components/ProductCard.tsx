import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/paginas/components/CartProvider";

interface ProductCardProps {
  id: number;
  imageBase64: string;
  name: string;
  price: string;
  category: string;
  size: string; // talla inicial
}

const ProductCard = ({ id, imageBase64, name, price, category, size }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(size);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: id,
      name,
      price,
      size: selectedSize,
      quantity: 1,
      imageBase64,
    });
  };

  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col">
      <img src={imageBase64} alt={name} className="w-full h-64 object-cover rounded mb-4" />
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-500">Precio: ${price}</p>
      <p className="text-gray-500">Categoría: {category}</p>

      {/* Dropdown de tallas */}
      <label className="mt-2 font-medium mr-2">Talla:</label>
      <select
        value={selectedSize}
        onChange={(e) => setSelectedSize(e.target.value)}
        className=" custome-select mb-4"
      >
        {["S", "M", "L", "XL"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="flex justify-between items-center mt-auto">
        <Button onClick={() => setIsFavorite(!isFavorite)} variant="ghost">
          <Heart className={isFavorite ? "text-red-500" : "text-gray-400"} />
        </Button>
        <Button onClick={handleAddToCart} className="add-cart-button flex items-center gap-2">
          <ShoppingCart />
          Agregar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
