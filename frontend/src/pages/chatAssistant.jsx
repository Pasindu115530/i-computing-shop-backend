import { useEffect, useMemo, useRef, useState } from "react";

export default function ChatAssistant() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! I'm your AI assistant powered by Gemini. Ask me about products, orders, or anything store-related." },
    ]);
    const [input, setInput] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState("");
    const listRef = useRef(null);

    // stable body builder to avoid stale closures when sending
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
    }, [messages]);

    const sendMessage = async () => {
        const trimmed = input.trim();
        if (!trimmed || isSending) return;

        const userEntry = { role: "user", content: trimmed };
        setMessages((prev) => [...prev, userEntry]);
        setInput("");
        setIsSending(true);
        setError("");

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyWithHistory(trimmed)),
            });

            if (!response.ok) {
                throw new Error(`Chat request failed with ${response.status}`);
            }

            const data = await response.json();
            const reply = data?.reply || "Sorry, I could not generate a response.";
            setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch (err) {
            console.error(err);
            const message = "Something went wrong. Please try again.";
            setError(message);
            setMessages((prev) => [...prev, { role: "assistant", content: message }]);
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="min-h-[calc(100vh-120px)] bg-gradient-to-b from-slate-50 to-white py-10 px-4 md:px-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl border border-slate-100 flex flex-col h-[70vh]">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-blue-600">Gemini Assistant</p>
                        <p className="text-xs text-slate-500">Ask about products, orders, or store info.</p>
                    </div>
                    {isSending && <span className="text-xs text-blue-500 animate-pulse">Thinking…</span>}
                </div>

                <div
                    ref={listRef}
                    className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 bg-slate-50/60"
                >
                    {messages.map((msg, idx) => (
                        <div
                            key={`${msg.role}-${idx}`}
                            className={`flex ${msg.role === "assistant" ? "justify-start" : "justify-end"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm border border-slate-100 ${
                                    msg.role === "assistant"
                                        ? "bg-white text-slate-800"
                                        : "bg-blue-600 text-white"
                                }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-100 bg-white">
                    {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
                    <div className="flex items-end gap-3">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={2}
                            placeholder="Ask me anything about the store..."
                            className="flex-1 resize-none rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-3 py-2 text-sm text-slate-800 shadow-sm"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isSending || !input.trim()}
                            className="rounded-xl bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {isSending ? "Sending..." : "Send"}
                        </button>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-400">Powered by Google Gemini — do not share sensitive info.</p>
                </div>
            </div>
        </div>
    );
}
