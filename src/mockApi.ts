import { Session } from "./types";

let sessions: Session[] = [
  {
    id: "1",
    topic: "Project deadlines dispute",
    otherParty: "Alex Smith",
    framework: "Collaborative problem-solving",
    status: "Your Turn",
    exchanges: 2,
    started: "2025-08-01",
    history: [
      { role: "mediator", text: "Mediator: Please share your view on the current deadline." }
    ]
  },
  {
    id: "2",
    topic: "Remote work policy disagreement",
    otherParty: "Jamie Lee",
    framework: "Interest-based negotiation",
    status: "Awaiting Response",
    exchanges: 3,
    started: "2025-07-28",
    history: [
      { role: "mediator", text: "Mediator: Waiting for the other party's response." }
    ]
  },
  {
    id: "3",
    topic: "Resource allocation conflict",
    otherParty: "Taylor Green",
    framework: "Facilitated dialogue",
    status: "In Progress",
    exchanges: 5,
    started: "2025-07-25",
    history: [
      { role: "mediator", text: "Mediator: Discussion is ongoing." }
    ]
  }
];

export async function getSessions(): Promise<Session[]> {
  return new Promise((resolve) => setTimeout(() => resolve(sessions), 300));
}

export async function getSession(id: string): Promise<Session | undefined> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(sessions.find(s => s.id === id)), 300)
  );
}

export async function sendPrivateInput(sessionId: string, text: string): Promise<Session | undefined> {
  return new Promise((resolve) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return resolve(undefined);

    session.history.push({ role: "you", text });

    setTimeout(() => {
      session.history.push({ role: "mediator", text: "Mediator (mock): I understand your point. Let's consider options." });
      session.exchanges += 1;
      session.status = session.status === "Your Turn" ? "Awaiting Response" : "Your Turn";
      resolve(session);
    }, 1500);
  });
}
