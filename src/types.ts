export type SessionStatus = "Your Turn" | "Awaiting Response" | "In Progress";

export interface Session {
  id: string;
  topic: string;
  otherParty: string;
  framework: string;
  status: SessionStatus;
  exchanges: number;
  started: string; // ISO date
  history: { role: "you" | "mediator"; text: string }[];
}
