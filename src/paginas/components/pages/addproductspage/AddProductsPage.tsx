import { useState, useEffect } from "react";
import ProductForm from "../../ProductForm";
import ProductTable from "../../ProductTable";
import type { Product } from "@/api/service/ProductService";
import {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} from "@/api/service/ProductService";

export default function AddProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Cargar productos
  const loadProducts = async () => {
    const res = await getAllProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Función para agregar o editar
  const handleSubmit = async (id: number | null, formData: FormData) => {
    if (id) {
      await updateProduct(id, formData);
      alert("Producto actualizado 🎉");
    } else {
      await createProduct(formData);
      alert("Producto agregado 🎉");
    }
    setEditingProduct(null);
    loadProducts();
  };

  // Eliminar producto
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Panel de administrador</h1>

      {/* Formulario */}
      <ProductForm
        initialData={editingProduct ?? undefined}
        onSubmit={handleSubmit}
      />

      {/* Tabla */}
      <ProductTable
        products={products}
        onEdit={(product) => setEditingProduct(product)}
        onDelete={handleDelete}
      />
    </div>
  );
}
