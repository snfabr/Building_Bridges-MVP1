import { useEffect, useState } from "react";
import { getSessions, createSession } from "../mockApi";
import { Session } from "../types";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const [topic, setTopic] = useState("");
  const [other, setOther] = useState("");
  const [framework, setFramework] = useState("Collaborative problem-solving");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getSessions().then((data) => {
      setSessions(data);
      setLoading(false);
    });
  }, []);

  const handleCreate = async () => {
    if (!topic.trim() || !other.trim()) return;
    setCreating(true);
    const s = await createSession(topic, other, framework);
    setSessions(prev => [s, ...prev]);
    setTopic(""); setOther("");
    setCreating(false);
  };

  if (loading) return <div>Loading sessions...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-3">Start a new session</h2>
        <div className="grid grid-cols-3 gap-3">
          <input className="border rounded p-2" placeholder="Topic" value={topic} onChange={e=>setTopic(e.target.value)} />
          <input className="border rounded p-2" placeholder="Other party" value={other} onChange={e=>setOther(e.target.value)} />
          <select className="border rounded p-2" value={framework} onChange={e=>setFramework(e.target.value)}>
            <option>Collaborative problem-solving</option>
            <option>Interest-based negotiation</option>
            <option>Facilitated dialogue</option>
          </select>
        </div>
        <button onClick={handleCreate} disabled={creating} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {creating ? "Creating..." : "Create session"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Your Mediation Sessions</h2>
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
    </div>
  );
}
