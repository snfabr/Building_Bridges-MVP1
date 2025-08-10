import { SessionStatus } from "../types";
export default function StatusBadge({ status }: { status: SessionStatus }) {
  const colors: Record<SessionStatus, string> = { "Your Turn": "bg-green-100 text-green-800", "Awaiting Response": "bg-yellow-100 text-yellow-800", "In Progress": "bg-blue-100 text-blue-800", };
  return (<span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>{status}</span>);
}
