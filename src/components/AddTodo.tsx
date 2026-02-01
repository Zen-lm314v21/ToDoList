import { useState } from "react";

interface AddTodoProps {
    onAdd: (text: string, category: string, dueDate: number | null) => void;
}

const CATEGORIES = ["未分類", "仕事", "買い物", "個人", "学習", "その他"];

export function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState("");
    const [category, setCategory] = useState("未分類");
    const [dateStr, setDateStr] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            const dueDate = dateStr ? new Date(dateStr).getTime() : null;
            onAdd(text.trim(), category, dueDate);
            setText("");
            setCategory("未分類");
            setDateStr("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-4 bg-slate-800/30 p-4 rounded-2xl border border-slate-700/50">
            <div className="flex gap-4 flex-col sm:flex-row">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="やるべきことは何ですか？"
                    className="premium-input flex-1"
                />
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="premium-button whitespace-nowrap hidden sm:block"
                >
                    追加
                </button>
            </div>

            <div className="flex gap-4">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-[#1a1a1a] border border-[#404040] rounded-xl px-4 py-2 text-white/90 outline-none focus:border-purple-500 transition-colors w-1/2 cursor-pointer appearance-none"
                    style={{ backgroundImage: 'none' }}
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <input
                    type="date"
                    value={dateStr}
                    onChange={(e) => setDateStr(e.target.value)}
                    className="bg-[#1a1a1a] border border-[#404040] rounded-xl px-4 py-2 text-white/90 outline-none focus:border-purple-500 transition-colors w-1/2 cursor-pointer"
                />
            </div>

            <button
                type="submit"
                disabled={!text.trim()}
                className="premium-button whitespace-nowrap w-full sm:hidden"
            >
                追加
            </button>
        </form>
    );
}
