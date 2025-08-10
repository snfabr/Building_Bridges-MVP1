import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SessionView from "./pages/SessionView";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSession from "./pages/admin/AdminSession";
import AdminConfig from "./pages/admin/AdminConfig";
import TopNav from "./components/TopNav";

export default function App() {
  return (
    <Router>
      <div className="max-w-6xl mx-auto p-6">
        <TopNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/session/:id" element={<SessionView />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/session/:id" element={<AdminSession />} />
          <Route path="/admin/config" element={<AdminConfig />} />
          <Route path="*" element={<Navigate to=\"/\" />} />
        </Routes>
      </div>
    </Router>
  );
}
