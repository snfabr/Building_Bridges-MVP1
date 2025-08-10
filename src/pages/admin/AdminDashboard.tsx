import { useEffect, useState } from "react";
import { adminListSessions } from "../../mockApi";
import { Session } from "../../types";
import StatusBadge from "../../components/StatusBadge";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminListSessions().then((data) => {
      setSessions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Admin • Active Sessions</h2>
        <Link to="/admin/config" className="text-blue-600 hover:underline">Config</Link>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Topic</th>
            <th className="p-2 border">Other Party</th>
            <th className="p-2 border">Framework</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Exchanges</th>
            <th className="p-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s.id} className="border-t">
              <td className="p-2 border">{s.id}</td>
              <td className="p-2 border">{s.topic}</td>
              <td className="p-2 border">{s.otherParty}</td>
              <td className="p-2 border">{s.framework}</td>
              <td className="p-2 border"><StatusBadge status={s.status} /></td>
              <td className="p-2 border">{s.exchanges}</td>
              <td className="p-2 border">
                <Link to={`/admin/session/${s.id}`} className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-black">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
