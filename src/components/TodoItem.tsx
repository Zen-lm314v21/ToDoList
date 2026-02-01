import { Todo } from "@/types";

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
    return (
        <div className={`glass-panel p-4 rounded-xl flex items-center justify-between group transition-all duration-300 ${todo.completed ? 'opacity-60' : 'opacity-100'}`}>
            <div className="flex items-center gap-4 flex-1">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="todo-checkbox shrink-0"
                />
                <span
                    className={`text-lg transition-all duration-300 ${todo.completed
                            ? 'line-through text-slate-400'
                            : 'text-slate-100'
                        }`}
                >
                    {todo.text}
                </span>
            </div>

            <button
                onClick={() => onDelete(todo.id)}
                className="p-2 text-slate-400 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-lg hover:bg-white/5"
                aria-label="Delete todo"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
            </button>
        </div>
    );
}
