import React, { useState } from 'react'
import { useTodo } from '../context';

function TodoForm() {
    const[todo,setTodo]=useState("") 
    const {addTodo}=useTodo()

    const add=(e)=>{
        e.preventDefault();
        if(!todo)return
        addTodo({todo,isCompleted:false})
        console.log("todo",todo);
        setTodo("")
    }
    return (
        <form onSubmit={add} className="flex gap-3">
            <div className="flex-1 relative">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={todo}
                    onChange={(e)=>{setTodo(e.target.value)}}
                    className="w-full px-6 py-4 pr-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-300 text-lg"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
            </div>
            <button 
                type="submit" 
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                disabled={!todo.trim()}
            >
                Add Task
            </button>
        </form>
    );
}

export default TodoForm;

