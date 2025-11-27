import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { login } from "@/api/service/AuthService";
import type { LoginDTO } from "@/api/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginDTO>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [rolSeleccionado, setRolSeleccionado] = useState<"ADMINISTRADOR" | "VENDEDOR" | "CLIENTE">("ADMINISTRADOR");

  const onSubmit = async (data: LoginDTO) => {
    setLoading(true);
    try {
      const usuario = await login(data); // devuelve Persona

      // Validación del rol seleccionado
      if (usuario.rol !== rolSeleccionado) {
        toast.error(`Rol incorrecto. Tu rol real es: ${usuario.rol}`);
        return;
      }

      toast.success(`Bienvenido ${usuario.nombre}`);

      switch (usuario.rol) {
        case "ADMINISTRADOR":
          navigate("/admin/products");
          break;
        case "VENDEDOR":
          navigate("/ventas");
          break;
        default:
          navigate("/"); // CLIENTE
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dropdown de rol */}
          <FormItem>
            <FormLabel>Rol</FormLabel>
            <FormControl>
              <select
                value={rolSeleccionado}
                onChange={(e) =>
                  setRolSeleccionado(e.target.value as "ADMINISTRADOR" | "VENDEDOR" | "CLIENTE")
                }
                className="p-2 border rounded w-full"
              >
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                <option value="VENDEDOR">VENDEDOR</option>
                <option value="CLIENTE">CLIENTE</option>
              </select>
            </FormControl>
          </FormItem>

          {/* Botón */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? "Iniciando..." : "Ingresar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
