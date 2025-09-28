import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../features/todo/todoSlice';

const AddTodo = () => {
  const [input,setInput]=useState("");
  const dispatch=useDispatch()
  const addTodoHandler=(e)=>{
    e.preventDefault();
    dispatch(addTodo(input))
    setInput('');
  }

  return (
    <form onSubmit={addTodoHandler} className="flex gap-4">
      <input
        type="text"
        className="flex-1 px-6 py-4 bg-black border border-white text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors duration-200 text-lg"
        placeholder="Enter a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="px-8 py-4 bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        disabled={!input.trim()}
      >
        ADD TASK
      </button>
    </form>
  )
}

export default AddTodo