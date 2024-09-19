"use client";

import React, { useState } from "react";

import { FaTrash } from "react-icons/fa";

export default function Page() {
  const [todo, setTodo] = useState<string[]>([]);
  const [task, setTask] = useState("");

  // Add todo
  const addTodo = () => {
    // check if task is empty | if it is, do not add todo | else add todo
    if (task) {
      setTodo([...todo, task]);
      setTask("");
    }
    // else do nothing
    return;
  };

  // Remove Todo
  const removeTodo = (index: number) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const formDefault = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const deleteKey = (e: React.KeyboardEvent) => {
    if (e.key === "Delete") {
      removeTodo(todo.length - 1);
    }
  };

  return (
    <main className="bg-[#608ec6] min-h-screen max-h-full w-full">
      <div onKeyDown={deleteKey} className="flex flex-col items-center py-24">
        <header className="mb-10">
          <h2 className="text-4xl text-slate-700 text-center max-sm:text-4xl underline">
            What Goals Are You Setting Today?
          </h2>
        </header>
        <div className="flex flex-col">
          <form onSubmit={formDefault} action="">
            <div className="flex items-center justify-center space-x-2">
              <input
                className="w-full outline-none py-3 px-2 bg-transparent border border-slate-600 rounded-lg text-[#1D3E73] placeholder:text-[#1D3E73] focus:border-[#0D47A1]"
                type="text"
                value={task}
                placeholder="Write down your next big goal..."
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <button
                className="w-32 py-1 text-md bg-[#1D3E73] text-[#fff] rounded-lg hover:bg-[#204786] duration-300 transition-all"
                onClick={addTodo}
              >
                Add Your Next Goal
              </button>
            </div>
          </form>
          <div className="grid grid-cols-2 w-[50rem] gap-4 mt-5 max-lg:w-[45rem] max-md:w-[35rem] max-md:grid-cols-1 max-sm:w-[25rem] max-[420px]:w-[23rem]">
            {todo.map((task, index) => (
              <div
                className="border overflow-x-auto border-slate-700 rounded-lg"
                key={index}
              >
                <div className="flex flex-row justify-between px-2 py-3 h-auto">
                  <p className="text-[#1D3E73]">{task}</p>
                  <button
                    className="text-[#0D47A1] text-2xl inline-block ml-2 hover:text-[#1D3E73] duration-300 transition-all"
                    onClick={() => removeTodo(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
