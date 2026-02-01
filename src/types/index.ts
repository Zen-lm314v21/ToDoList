export interface Todo {
    id: string;
    text: string;
    category: string;
    dueDate: number | null;
    completed: boolean;
    createdAt: number;
}
