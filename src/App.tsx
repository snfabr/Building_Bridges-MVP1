import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SessionView from "./pages/SessionView";

export default function App() {
  return (
    <Router>
      <div className="max-w-5xl mx-auto p-6">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Building Bridges</h1>
          <div className="text-sm text-gray-600">Participant</div>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/session/:id" element={<SessionView />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
