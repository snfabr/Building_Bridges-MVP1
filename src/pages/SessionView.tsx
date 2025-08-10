import { useEffect, useMemo, useState } from "react";
import { getSession, sendPrivateInput } from "../mockApi";
import { Session } from "../types";
import { useParams, Link } from "react-router-dom";
import { downloadText } from "../utils/download";

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

  const transcriptMd = useMemo(() => {
    if (!session) return "";
    const lines = [
      `# Mediation Transcript`,
      ``,
      `**Topic:** ${session.topic}`,
      `**Other Party:** ${session.otherParty}`,
      `**Framework:** ${session.framework}`,
      `**Started:** ${session.started}`,
      ``,
      `---`,
      ``,
      ...session.history.map(h => `**${h.role === "you" ? "You" : h.role === "mediator" ? "Mediator" : "Other"}:** ${h.text}`)
    ];
    return lines.join("\n");
  }, [session]);

  if (loading) return <div>Loading session...</div>;
  if (!session) return <div>Session not found.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Dashboard</Link>
        <button onClick={() => downloadText(`session-${session.id}.md`, transcriptMd)} className="bg-gray-800 text-white px-3 py-2 rounded hover:bg-black">
          Export transcript (Markdown)
        </button>
      </div>
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
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter your private input..." className="w-full border rounded p-2 mb-2" rows={3} />
        <button onClick={handleSend} disabled={sending} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {sending ? "Sending..." : "Send to Mediator"}
        </button>
      </div>
    </div>
  );
}
