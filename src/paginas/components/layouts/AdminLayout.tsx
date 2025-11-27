
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../NavbarAdmin";

export default function AdminLayout() {
  return (
    <div>
      <NavbarAdmin />
      <div className="">
        <Outlet /> {/* Aquí se renderiza la página hija */}
      </div>
    </div>
  );
}
