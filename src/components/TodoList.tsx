"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/types";
import { AddTodo } from "./AddTodo";
import { TodoItem } from "./TodoItem";

type SortOption = 'created' | 'dueDate' | 'category';

export function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('created');
    const [showCompleted, setShowCompleted] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem("premium-todos");
        if (saved) {
            try {
                setTodos(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse todos", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("premium-todos", JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const addTodo = (text: string, category: string, dueDate: number | null) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
            category,
            dueDate,
            completed: false,
            createdAt: Date.now(),
        };
        setTodos((prev) => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const getSortedTodos = () => {
        return [...todos].sort((a, b) => {
            if (sortBy === 'dueDate') {
                // 期限なしは最後
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return a.dueDate - b.dueDate;
            }
            if (sortBy === 'category') {
                const catA = a.category || "";
                const catB = b.category || "";
                return catA.localeCompare(catB);
            }
            // default: created (newest first)
            return b.createdAt - a.createdAt;
        });
    };

    if (!isLoaded) {
        return <div className="animate-pulse flex flex-col gap-4">
            <div className="h-12 bg-slate-800/50 rounded-xl"></div>
            <div className="h-20 bg-slate-800/50 rounded-xl"></div>
            <div className="h-20 bg-slate-800/50 rounded-xl"></div>
        </div>;
    }

    const sortedTodos = getSortedTodos();
    const filteredTodos = showCompleted
        ? sortedTodos
        : sortedTodos.filter(todo => !todo.completed);

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <AddTodo onAdd={addTodo} />

            <div className="flex justify-between items-center mb-4 bg-slate-800/30 p-2 rounded-lg border border-slate-700/30">
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none px-2">
                    <input
                        type="checkbox"
                        checked={showCompleted}
                        onChange={(e) => setShowCompleted(e.target.checked)}
                        className="rounded border-slate-600 bg-slate-700/50 text-purple-500 focus:ring-purple-500/50 cursor-pointer"
                    />
                    完了済みを表示
                </label>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-transparent text-slate-400 text-sm border border-slate-700/50 rounded-lg px-2 py-1 outline-none hover:bg-slate-700/30 transition-colors"
                >
                    <option value="created">作成順</option>
                    <option value="dueDate">期限が近い順</option>
                    <option value="category">カテゴリ順</option>
                </select>
            </div>

            <div className="flex flex-col gap-3">
                {filteredTodos.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <p className="text-lg">
                            {showCompleted ? "タスクがありません。上のフォームから追加しましょう！" : "表示するタスクがありません（完了済みは非表示）"}
                        </p>
                    </div>
                ) : (
                    filteredTodos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    ))
                )}
            </div>

            {todos.length > 0 && (
                <div className="mt-8 text-center text-slate-500 text-sm">
                    残り {todos.filter(t => !t.completed).length} 件
                </div>
            )}
        </div>
    );
}
