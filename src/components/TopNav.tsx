import { Link, useLocation } from "react-router-dom";

export default function TopNav() {
  const { pathname } = useLocation();
  const link = (to: string, label: string) => (
    <Link to={to} className={`px-3 py-2 rounded hover:bg-gray-200 ${pathname.startsWith(to) ? "font-semibold underline" : ""}`}>{label}</Link>
  );
  return (
    <header className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Building Bridges</h1>
        <nav className="text-sm text-gray-700 flex gap-2">
          {link("/", "Dashboard")}
          {link("/admin", "Admin")}
          {link("/admin/config", "Config")}
        </nav>
      </div>
      <div className="text-sm text-gray-600">Mock • Not real data</div>
    </header>
  );
}
