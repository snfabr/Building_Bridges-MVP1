import { useEffect, useState } from "react";
import { getSessions } from "../mockApi";
import { Session } from "../types";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessions().then((data) => {
      setSessions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading sessions...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Your Mediation Sessions</h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-2 border">Topic</th>
            <th className="p-2 border">Other Party</th>
            <th className="p-2 border">Framework</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Exchanges</th>
            <th className="p-2 border">Started</th>
            <th className="p-2 border"></th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s.id} className="border-t">
              <td className="p-2 border">{s.topic}</td>
              <td className="p-2 border">{s.otherParty}</td>
              <td className="p-2 border">{s.framework}</td>
              <td className="p-2 border"><StatusBadge status={s.status} /></td>
              <td className="p-2 border">{s.exchanges}</td>
              <td className="p-2 border">{s.started}</td>
              <td className="p-2 border">
                <Link to={`/session/${s.id}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Resume
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
