import { useEffect, useState } from "react";
import { getSession, sendPrivateInput } from "../mockApi";
import { Session } from "../types";
import { useParams, Link } from "react-router-dom";

export default function SessionView() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Session | undefined>();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (id) {
      getSession(id).then((data) => {
        setSession(data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleSend = () => {
    if (!id || !input.trim()) return;
    setSending(true);
    sendPrivateInput(id, input).then((updated) => {
      setSession(updated);
      setInput("");
      setSending(false);
    });
  };

  if (loading) return <div>Loading session...</div>;
  if (!session) return <div>Session not found.</div>;

  return (
    <div className="space-y-4">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Dashboard</Link>
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">{session.topic}</h2>
        <div className="border rounded-lg p-4 mb-4 h-72 overflow-y-auto bg-gray-50">
          {session.history.map((h, idx) => (
            <div key={idx} className={`mb-2 ${h.role === "you" ? "text-right" : "text-left"}`}>
              <span className={`inline-block px-3 py-2 rounded ${h.role === "you" ? "bg-green-200" : "bg-gray-200"}`}>
                {h.text}
              </span>
            </div>
          ))}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your private input..."
          className="w-full border rounded p-2 mb-2"
          rows={3}
        />
        <button
          onClick={handleSend}
          disabled={sending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send to Mediator"}
        </button>
      </div>
    </div>
  );
}
