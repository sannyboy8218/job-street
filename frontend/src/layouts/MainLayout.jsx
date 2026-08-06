import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      {/* Navbar will go here */}

      <Outlet />

      {/* Footer will go here */}
    </div>
  );
}