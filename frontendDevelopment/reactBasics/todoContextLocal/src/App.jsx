import { useState,useEffect, useLayoutEffect } from 'react'
import { useTodo,TodoContextProvider } from './context'
import './App.css'
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos,setTodos]=useState([{
    id: 1758911266421,
    isCompleted: false,
    todo: "Done with this note making."
  }]);
  const addTodo=(todo)=>{
    setTodos((prev)=>[...prev,{id:Date.now(),...todo}]);
  }
  const updateTodo=(id,todo)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?todo:prevTodo)))
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }
  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevTodo)=>(prevTodo.id===id?{...prevTodo,isCompleted:!prevTodo.isCompleted}:prevTodo)))
  }

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"));
    
    if(todos && todos.length>0){
      setTodos(todos);
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])
  
  return (
    <TodoContextProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-8 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <p className="text-teal-400 text-lg font-medium mb-4">Hi, welcome to your</p>
              <h1 className="text-6xl font-bold text-white mb-4">
                Task Manager
              </h1>
              <p className="text-gray-300 text-xl mb-2">Organize Your Life</p>
              <p className="text-white text-2xl font-semibold">With Purpose.</p>
            </div>

            {/* Main Content */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {/* Todo Form */}
              <div className="mb-8">
                <TodoForm/>
              </div>

              {/* Todo List */}
              <div className="space-y-4">
                {todos.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">No tasks yet</h3>
                    <p className="text-gray-400">Start by adding your first task above!</p>
                  </div>
                ) : (
                  todos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))
                )}
              </div>

              {/* Stats */}
              {todos.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Total: <span className="text-white font-medium">{todos.length}</span></span>
                    <span>Completed: <span className="text-teal-400 font-medium">{todos.filter(todo => todo.isCompleted).length}</span></span>
                    <span>Remaining: <span className="text-white font-medium">{todos.filter(todo => !todo.isCompleted).length}</span></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TodoContextProvider>
  )
}

export default App
