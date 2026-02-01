import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center pt-24 pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-600/20 blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        ToDoList_Zt
      </h1>
      <p className="text-slate-400 mb-12 font-light tracking-wide">重要なことに集中しよう</p>

      <TodoList />
    </main>
  );
}
