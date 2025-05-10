import { useState, useEffect } from "react";
import "./App.css";
import { Todoprovider } from "./context";
import TodoForm from "./component/todoform";
import Todolist from "./component/todolist";

function App() {
  const [Todos, SetTodos] = useState([]);

  // Add Todo
  const addTodo = () => {
    SetTodos((prev) => [{ id: Date.now(), completed: false }, ...prev]); 
  };

  // Update Todo
  const updateTodo = (id, updatedTodo) => {
    SetTodos((prev) =>
      prev.map((prevtodo) => (prevtodo.id === id ? updatedTodo : prevtodo))
    );
  };

  // Delete Todo
  const deleteTodo = (id) => {
    SetTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Toggle Completion Status
  const togglecomplete = (id) => {
    SetTodos((prev) =>
      prev.map((prevtodo) =>
        prevtodo.id === id ? { ...prevtodo, completed: !prevtodo.completed } : prevtodo
      )
    );
  };

  // Load Todos from localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("Todos");
    try {
      const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
      if (Array.isArray(parsedTodos)) {
        SetTodos(parsedTodos);
      }
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
    }
  }, []);

  // Save Todos to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(Todos));
  }, [Todos]);

  return (
    <Todoprovider value={{ Todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {Todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <Todolist todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  );
}

export default App;
