import React, { useState } from 'react'
import { useTodo } from '../context';

function TodoItem({ todo }) {
    
    const [isTodoEditable, setisTodoEditable] = useState(false);
    const [todoMsg,setTodoMsg]=useState(todo.todo);
    const{updateTodo,deleteTodo,toggleComplete}=useTodo()

    const editTodo=()=>{
        updateTodo(todo.id,{...todo,todo:todoMsg});
        setisTodoEditable(false);
    }
    return (
        <div
            className={`group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 shadow-sm hover:shadow-lg hover:bg-white/10 transition-all duration-300 ${
                todo.isCompleted ? "opacity-60" : ""
            }`}
        >
            <div className="flex items-center gap-4">
                {/* Checkbox */}
                <div className="flex-shrink-0">
                    <input
                        type="checkbox"
                        className="w-6 h-6 text-teal-500 bg-white/10 border-white/20 rounded focus:ring-teal-400 focus:ring-2 cursor-pointer"
                        checked={todo.isCompleted}
                        onChange={()=>toggleComplete(todo.id)}
                    />
                </div>

                {/* Todo Text */}
                <div className="flex-1 min-w-0">
                    <input
                        type="text"
                        className={`w-full bg-transparent text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-lg ${
                            isTodoEditable 
                                ? "border border-white/30 rounded-lg px-4 py-2 bg-white/10 backdrop-blur-sm" 
                                : "border-transparent"
                        } ${todo.isCompleted ? "line-through text-gray-400" : ""}`}
                        value={todoMsg}
                        onChange={(e) => setTodoMsg(e.target.value)}
                        readOnly={!isTodoEditable}
                        placeholder="Enter todo..."
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Edit/Save Button */}
                    <button
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-teal-400 hover:bg-teal-400/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => {
                            if (todo.isCompleted) return;
                            if (isTodoEditable) {
                                editTodo();
                            } else setisTodoEditable((prev) => !prev);
                        }}
                        disabled={todo.isCompleted}
                        title={isTodoEditable ? "Save changes" : "Edit todo"}
                    >
                        {isTodoEditable ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        )}
                    </button>

                    {/* Delete Button */}
                    <button
                        className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300"
                        onClick={() => deleteTodo(todo.id)}
                        title="Delete todo"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Completion indicator */}
            {todo.isCompleted && (
                <div className="absolute top-3 right-3">
                    <div className="w-3 h-3 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50"></div>
                </div>
            )}
        </div>
    );
}

export default TodoItem;
