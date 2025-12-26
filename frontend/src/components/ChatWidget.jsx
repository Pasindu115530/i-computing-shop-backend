import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4900";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m your AI assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);

  const bodyWithHistory = useMemo(
    () => (message) => ({
      message,
      history: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
    [messages]
  );

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userEntry = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userEntry]);
    setInput("");
    setIsSending(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyWithHistory(trimmed)),
      });

      if (!res.ok) {
        let serverMsg = `Request failed ${res.status}`;
        try {
          const maybeJson = await res.json();
          if (maybeJson?.error) serverMsg = maybeJson.error;
        } catch (_) {
          try { serverMsg = await res.text(); } catch (_) {}
        }
        throw new Error(serverMsg);
      }
      const data = await res.json();
      const reply = data?.reply || "Sorry, I couldn’t generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error(e);
      const msg = e?.message || "Something went wrong. Please try again.";
      setError(msg);
      setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed z-[100] right-4 bottom-4">
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-200 flex items-center justify-center hover:bg-blue-700 transition"
          aria-label="Open assistant"
        >
          <Bot size={24} />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="w-[90vw] max-w-sm h-[60vh] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-blue-600 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={18} />
              <span className="text-sm font-semibold">Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-md hover:bg-white/20"
              aria-label="Close assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="flex-1 overflow-y-auto bg-slate-50/60 px-3 py-3 space-y-3">
            {messages.map((m, idx) => (
              <div key={`${m.role}-${idx}`} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm border border-slate-100 ${
                    m.role === "assistant" ? "bg-white text-slate-800" : "bg-blue-600 text-white"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          {/* Composer */}
          <div className="p-3 border-t border-slate-100 bg-white">
            {error && <p className="text-[11px] text-red-500 mb-1">{error}</p>}
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Type your message…"
                className="flex-1 resize-none rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-3 py-2 text-sm text-slate-800 shadow-sm"
              />
              <button
                onClick={sendMessage}
                disabled={isSending || !input.trim()}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                aria-label="Send message"
              >
                {isSending ? (
                  <span className="text-[11px]">…</span>
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
            <p className="mt-1 text-[10px] text-slate-400">Powered by Gemini. Don’t share sensitive info.</p>
          </div>
        </div>
      )}
    </div>
  );
}
