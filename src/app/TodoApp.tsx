"use client";

import React, { useState } from "react";
import {
  FaTrash,
  FaEdit,
  FaCalendarAlt,
  FaBullseye,
  FaPlus,
  FaSave,
  FaCheck,
} from "react-icons/fa";

interface Todo {
  task: string;
  date: string;
  completed: boolean;
  progress: number;
}

export default function Page() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTask, setEditTask] = useState("");

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Generate random progress between 10-90%
  const getRandomProgress = () => Math.floor(Math.random() * 81) + 10;

  // Add or edit a todo
  const addOrEditTodo = () => {
    if (isEditing !== null) {
      const updatedTodo = [...todo];
      updatedTodo[isEditing] = {
        ...updatedTodo[isEditing],
        task: editTask,
      };
      setTodo(updatedTodo);
      setIsEditing(null);
      setEditTask("");
    } else if (task) {
      setTodo([
        ...todo,
        {
          task,
          date: getCurrentDate(),
          completed: false,
          progress: getRandomProgress(),
        },
      ]);
      setTask("");
    }
  };

  // Remove a todo
  const removeTodo = (index: number) => {
    const newTodos = [...todo];
    newTodos.splice(index, 1);
    setTodo(newTodos);
  };

  // Edit a todo
  const handleEdit = (index: number) => {
    setIsEditing(index);
    setEditTask(todo[index].task);
  };

  // Toggle completion status
  const toggleComplete = (index: number) => {
    const updatedTodo = [...todo];
    updatedTodo[index] = {
      ...updatedTodo[index],
      completed: !updatedTodo[index].completed,
      progress: updatedTodo[index].completed ? getRandomProgress() : 100,
    };
    setTodo(updatedTodo);
  };

  // Form submission handler
  const formDefault = (e: React.FormEvent) => {
    e.preventDefault();
    addOrEditTodo();
  };

  // Keyboard handlers
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addOrEditTodo();
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] animate-gradient bg-[length:400%_400%] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4 max-sm:text-4xl">
            What&apos;s Your <span className="text-white">Mission Today?</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            &quot;Dream it. Plan it. Achieve it.&quot; Track your goals with purpose.
          </p>
        </header>

        {/* Input Section */}
        <form onSubmit={formDefault} className="mb-16">
          <div className="flex gap-3 max-md:flex-col">
            <input
              className="flex-grow p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-lg transition-all"
              type="text"
              value={isEditing !== null ? editTask : task}
              placeholder="E.g., 'Learn React Advanced Concepts'"
              onChange={(e) =>
                isEditing !== null
                  ? setEditTask(e.target.value)
                  : setTask(e.target.value)
              }
              onKeyDown={onKeyDown}
            />
            <button
              className="flex items-center gap-2 px-8 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all max-md:w-full max-md:justify-center"
              type="button"
              onClick={addOrEditTodo}
            >
              {isEditing !== null ? (
                <>
                  <FaSave /> Update Goal
                </>
              ) : (
                <>
                  <FaPlus /> Add Goal
                </>
              )}
            </button>
          </div>
        </form>

        {/* Goals Grid */}
        {todo.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todo.map((item, index) => (
              <div
                key={index}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border border-white/10 overflow-hidden ${
                  item.completed ? "opacity-80" : ""
                }`}
              >
                {/* Check button - moved lower and to the left */}
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(index)}
                    className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                      item.completed
                        ? "bg-green-500 border-green-500"
                        : "border-2 border-gray-400 hover:border-cyan-400"
                    }`}
                  >
                    {item.completed && (
                      <FaCheck className="text-white text-xs" />
                    )}
                  </button>

                  {/* Text content - pushed more to the left */}
                  <div className="flex-1">
                    <p
                      className={`text-white font-medium text-xl mb-2 break-words ${
                        item.completed ? "line-through decoration-2" : ""
                      }`}
                    >
                      {item.task}
                    </p>
                    <p className="text-gray-300 text-sm flex items-center gap-1">
                      <FaCalendarAlt /> {item.date}
                    </p>

                    {/* Progress bar with random percentage */}
                    <div className="mt-4">
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {item.progress}% completed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => removeTodo(index)}
                    className="p-2 bg-white/20 hover:bg-red-500/80 rounded-full text-white transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 backdrop-blur-sm rounded-2xl">
            <FaBullseye className="mx-auto text-5xl text-cyan-400 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">
              No Goals Yet!
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Start by adding your first goal above. 🚀
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
