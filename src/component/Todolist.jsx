import React from 'react'
import { useState } from 'react';
import { useTodo } from '../context';

function TodoItem({ todo }) {
const [isTodoeditable , setIsTodoeditable ] = useState(false)
const [Todomsg, setTodomsg ] = useState(todo.todo)
    const { updateTodo, deleteTodo, toggleCompleted } = useTodo()


    const editTodo = () => {
        updateTodo(todo.id, {...todo, todo: Todomsg})
        setIsTodoeditable(false)
    }

  const toggleComplete = () => {
   
        toggleCompleted(todo.id)
    }


    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
                todo.complete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.Complete}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoeditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={Todomsg}
                onChange={(e) => setTodomsg(e.target.value)}
                readOnly={!isTodoeditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoeditable) {
                        editTodo();
                    } else setIsTodoeditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoeditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;

