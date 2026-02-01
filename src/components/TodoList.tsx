"use client";

import { useEffect, useState } from "react";
import { Todo } from "@/types";
import { AddTodo } from "./AddTodo";
import { TodoItem } from "./TodoItem";

export function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

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

    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: crypto.randomUUID(),
            text,
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

    if (!isLoaded) {
        return <div className="animate-pulse flex flex-col gap-4">
            <div className="h-12 bg-slate-800/50 rounded-xl"></div>
            <div className="h-20 bg-slate-800/50 rounded-xl"></div>
            <div className="h-20 bg-slate-800/50 rounded-xl"></div>
        </div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <AddTodo onAdd={addTodo} />

            <div className="flex flex-col gap-3">
                {todos.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <p className="text-lg">タスクがありません。上のフォームから追加しましょう！</p>
                    </div>
                ) : (
                    todos.map((todo) => (
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
