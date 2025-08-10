import { useEffect, useState } from "react";
import { adminGetSession } from "../../mockApi";
import { Session } from "../../types";
import { useParams, Link } from "react-router-dom";

export default function AdminSession() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      adminGetSession(id).then((data) => {
        setSession(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!session) return <div>Not found.</div>;

  return (
    <div className="space-y-4">
      <Link to="/admin" className="text-blue-600 hover:underline">&larr; Back to Admin</Link>
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Session {session.id} • {session.topic}</h2>
        <div className="border rounded-lg p-4 bg-gray-50">
          {session.history.map((h, i) => (
            <div key={i} className="mb-2">
              <span className="text-xs uppercase text-gray-500 mr-2">{h.role}</span>
              <span>{h.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
