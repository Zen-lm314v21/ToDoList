import { useState } from "react";

interface AddTodoProps {
    onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
    const [text, setText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="やるべきことは何ですか？"
                className="premium-input"
            />
            <button
                type="submit"
                disabled={!text.trim()}
                className="premium-button disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
            >
                追加
            </button>
        </form>
    );
}
