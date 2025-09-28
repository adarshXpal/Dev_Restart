import { useState } from 'react'
import Todo from './components/Todo'
import AddTodo from './components/AddTodo'
import './App.css'

function App() {

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-8 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
              TASK MANAGER
            </h1>
            <p className="text-white text-2xl font-medium">
              Organize your tasks with precision
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <AddTodo/>
            <Todo/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
