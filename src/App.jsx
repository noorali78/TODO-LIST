import { useState, useEffect } from 'react'

import './App.css'
import { Todoprovider, useTodo } from './context'
import TodoForm from './component/todoform'
import Todolist from './component/todolist'

function App() {
  const [Todos, SetTodos] = useState([])
  const addTodo = (todo) => {
    SetTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  }
   
  const updateTodo = (id, updatedTodo) => {
    SetTodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? { ...prevtodo, ...updatedTodo } : prevtodo)));
  }

  const  deleteTodo = (id) => {
    SetTodos((prev) => prev.filter((todo) => todo.id !== id ))
  }

  const togglecomplete = (id) => {
    SetTodos((prev) => prev.map((prevtodo)  => prevtodo.id === id   ? {...prevtodo, complete: !prevtodo.complete}: prevtodo))
  }

  useEffect(() => {
   const Todos =  JSON.parse(localStorage.getItem("Todos"))
if (Todos && Todos.length >0){
  SetTodos(Todos)
}
 },[])
 useEffect(() => {
  localStorage.setItem("Todos", JSON.stringify(Todos) )
 }, [Todos])

//  useEffect(() => {
//     const storedTodos = localStorage.getItem("Todos");
//     try {
//       const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
//       if (Array.isArray(parsedTodos)) {
//         SetTodos(parsedTodos);
//       }
//     } catch (error) {
//       console.error("Error parsing JSON from localStorage:", error);
//     }
//   }, []);

//   // Save Todos to localStorage when state changes
//   useEffect(() => {
//     localStorage.setItem("Todos", JSON.stringify(Todos));
//   }, [Todos]);

  

  return (
    <Todoprovider value = {{Todos, addTodo ,updateTodo , deleteTodo ,togglecomplete}}>
   <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {Todos.map((todo) => (
                          <div key={todo.id} className='w-full'>
                            <Todolist todo ={todo}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </Todoprovider>
  )
}

export default App
