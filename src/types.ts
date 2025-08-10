export type SessionStatus = "Your Turn" | "Awaiting Response" | "In Progress";

export interface Message { role: "you" | "mediator" | "other"; text: string; ts?: string; }

export interface Session { id: string; topic: string; otherParty: string; framework: string; status: SessionStatus; exchanges: number; started: string; history: Message[]; }

export type LlmProvider = "OpenAI" | "Anthropic" | "AzureOpenAI" | "LocalMock";

export interface SystemConfig { llmProvider: LlmProvider; }
