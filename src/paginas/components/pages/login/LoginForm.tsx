// src/components/LoginForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(email, password);

      // Verificar rol ADMIN
      if (user.rol !== "ADMIN") {
        alert("No tienes permisos de administrador");
        return;
      }

      alert(`Bienvenido ${user.nombre}`);
      navigate("/admin/products");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error en login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded shadow max-w-sm mx-auto mt-20">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Ingresando..." : "Login"}
      </button>
    </form>
  );
}
