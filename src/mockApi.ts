import { Session, SystemConfig } from "./types";

let config: SystemConfig = { llmProvider: "LocalMock" };

let sessions: Session[] = [
  { id: "1", topic: "Project deadlines dispute", otherParty: "Alex Smith", framework: "Collaborative problem-solving", status: "Your Turn", exchanges: 2, started: "2025-08-01", history: [ { role: "mediator", text: "Mediator: Please share your view on the current deadline." } ] },
  { id: "2", topic: "Remote work policy disagreement", otherParty: "Jamie Lee", framework: "Interest-based negotiation", status: "Awaiting Response", exchanges: 3, started: "2025-07-28", history: [ { role: "mediator", text: "Mediator: Waiting for the other party's response." } ] },
  { id: "3", topic: "Resource allocation conflict", otherParty: "Taylor Green", framework: "Facilitated dialogue", status: "In Progress", exchanges: 5, started: "2025-07-25", history: [ { role: "mediator", text: "Mediator: Discussion is ongoing." } ] }
];

function delay(ms: number) { return new Promise(res => setTimeout(res, ms)); }

export async function getSessions() { await delay(250); return sessions; }
export async function getSession(id: string) { await delay(250); return sessions.find(s => s.id === id); }

export async function createSession(topic: string, otherParty: string, framework: string) {
  await delay(250);
  const id = (sessions.length + 1).toString();
  const s: Session = { id, topic, otherParty, framework, status: "Your Turn", exchanges: 0, started: new Date().toISOString().slice(0,10), history: [ { role: "mediator", text: "Mediator: Thanks for starting. Share your perspective when ready." } ] };
  sessions.unshift(s);
  return s;
}

export async function sendPrivateInput(sessionId: string, text: string) {
  const s = sessions.find(ss => ss.id === sessionId);
  if (!s) return undefined;
  s.history.push({ role: "you", text });
  await delay(1200);
  const reply = `Mediator (${config.llmProvider} mock): I hear your point about "${text[:50]}". What outcome would feel fair to both sides?`;
  s.history.push({ role: "mediator", text: reply });
  s.exchanges += 1;
  s.status = s.status === "Your Turn" ? "Awaiting Response" : "Your Turn";
  return s;
}

export async function adminListSessions() { await delay(200); return sessions; }
export async function adminGetSession(id: string) { await delay(200); return sessions.find(s => s.id === id); }

export async function getConfig() { await delay(150); return config; }
export async function setConfig(partial: Partial<SystemConfig>) { await delay(150); config = { ...config, ...partial }; return config; }
