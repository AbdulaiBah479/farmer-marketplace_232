"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Plus, Bot, User2, Loader2, Wrench } from "lucide-react";
import type { Tenant, User, Conversation } from "@/types";

interface Message { id: string; role: "user" | "assistant"; content: string; agentType?: string; toolsUsed?: string[]; timestamp: Date; }

const AGENT_COLORS: Record<string, string> = { receptionist: "bg-purple-50 text-purple-700", email: "bg-orange-50 text-orange-700", scheduler: "bg-green-50 text-green-700", support: "bg-red-50 text-red-700", orchestrator: "bg-blue-50 text-blue-700" };

const SUGGESTED_PROMPTS = ["Schedule a meeting with our client tomorrow at 3pm", "Draft a professional follow-up email to John from our last meeting", "What are our company's support hours?", "Create a task to review Q4 budget by end of week", "Check what meetings we have next week"];

function renderMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>").replace(/`(.*?)`/g, "<code>$1</code>").replace(/^### (.*$)/gm, "<h3>$1</h3>").replace(/^## (.*$)/gm, "<h2>$1</h2>").replace(/^# (.*$)/gm, "<h1>$1</h1>").replace(/^\- (.+)$/gm, "<li>$1</li>").replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>");
}

export default function ChatInterface({ tenant, user, initialConversations }: { tenant: Tenant; user: User; initialConversations: Conversation[] }) {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || sending) return;
    setInput(""); setSending(true);
    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    try {
      const res = await fetch("/api/agents/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: content, conversationId: activeConvId, channel: "web" }) });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      if (!activeConvId) {
        setActiveConvId(data.conversationId);
        setConversations((prev) => [{ id: data.conversationId, tenant_id: tenant.id, title: content.slice(0, 60), channel: "web", status: "open", external_id: null, metadata: {}, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, ...prev]);
      }
      setMessages((prev) => [...prev, { id: data.message.id, role: "assistant", content: data.message.content, agentType: data.agentType, toolsUsed: data.toolsUsed, timestamp: new Date(data.message.created_at) }]);
    } catch { setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: "Sorry, I encountered an error. Please try again.", timestamp: new Date() }]); }
    finally { setSending(false); }
  }

  return (
    <div className="flex h-full gap-0 -m-6 rounded-2xl overflow-hidden border border-gray-100 bg-white">
      <div className="w-72 flex-shrink-0 border-r border-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <button onClick={() => { setActiveConvId(null); setMessages([]); }} className="w-full flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-blue-700">
            <Plus className="w-4 h-4" />New conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.map((conv) => (
            <button key={conv.id} onClick={() => setActiveConvId(conv.id)} className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors text-sm mb-1 ${activeConvId === conv.id ? "bg-blue-50 text-blue-900" : "hover:bg-gray-50 text-gray-700"}`}>
              <div className="font-medium truncate">{conv.title ?? "Untitled"}</div>
              <div className="text-xs text-gray-400 mt-0.5">{new Date(conv.updated_at).toLocaleDateString()}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-14 border-b border-gray-100 flex items-center px-6 gap-3 flex-shrink-0">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center"><Bot className="w-3.5 h-3.5 text-white" /></div>
          <div><div className="text-sm font-semibold text-gray-900">NexusAI</div><div className="text-xs text-green-500 font-medium">All agents active</div></div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4"><Bot className="w-8 h-8 text-blue-600" /></div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">How can I help {tenant.name}?</h2>
              <p className="text-gray-500 text-sm max-w-sm mb-8">I can manage emails, schedule meetings, answer questions from your knowledge base, and create tasks.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                {SUGGESTED_PROMPTS.map((prompt) => (<button key={prompt} onClick={() => sendMessage(prompt)} className="text-left text-sm px-4 py-3 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 text-gray-700">{prompt}</button>))}
              </div>
            </div>
          ) : messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-gray-200" : "bg-blue-600"}`}>{msg.role === "user" ? <User2 className="w-4 h-4 text-gray-600" /> : <Bot className="w-4 h-4 text-white" />}</div>
              <div className={`flex flex-col gap-1 max-w-2xl ${msg.role === "user" ? "items-end" : "items-start"}`}>
                {msg.agentType && <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${AGENT_COLORS[msg.agentType] ?? "bg-gray-100 text-gray-600"}`}>{msg.agentType} agent</div>}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed prose-ai ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-sm" : "bg-gray-100 text-gray-800 rounded-bl-sm"}`} dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                {msg.toolsUsed && msg.toolsUsed.length > 0 && <div className="flex items-center gap-1 text-xs text-gray-400"><Wrench className="w-3 h-3" />{msg.toolsUsed.join(", ")}</div>}
                <div className="text-xs text-gray-400">{msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            </div>
          ))}
          {sending && <div className="flex gap-3"><div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div><div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3"><Loader2 className="w-4 h-4 text-gray-400 animate-spin" /></div></div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-gray-100 p-4 flex-shrink-0">
          <div className="flex items-end gap-3 bg-gray-50 rounded-2xl border border-gray-200 px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20">
            <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} rows={1} placeholder="Message your AI workforce… (Enter to send)" className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none min-h-[24px] max-h-32" onInput={(e) => { const t = e.target as HTMLTextAreaElement; t.style.height = "auto"; t.style.height = Math.min(t.scrollHeight, 128) + "px"; }} />
            <button onClick={() => sendMessage()} disabled={!input.trim() || sending} className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 disabled:opacity-40 flex-shrink-0"><Send className="w-4 h-4" /></button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">AI agents can make mistakes. Verify important actions before confirming.</p>
        </div>
      </div>
    </div>
  );
}
