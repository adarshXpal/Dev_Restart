import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../features/todo/todoSlice'

const Todo = () => {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  // State to track which todo is being edited and its new text
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleEditClick = (todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const handleUpdate = (id) => {
    if (editText.trim() !== '') {
      dispatch(updateTodo({ id, text: editText }))
      setEditId(null)
      setEditText('')
    }
  }

  const handleCancel = () => {
    setEditId(null)
    setEditText('')
  }

  return (
    <div>
      {todos.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-bold text-white mb-4">NO TASKS YET</h3>
          <p className="text-gray-500 text-lg">Add your first task above to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="group flex items-center justify-between py-4 px-6 border border-white hover:border-cyan-400 transition-colors duration-200"
            >
              <div className="flex-1">
                {editId === todo.id ? (
                  <input
                    type="text"
                    className="w-full bg-black text-white border-none outline-none text-lg"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <div className="text-white text-lg">{todo.text}</div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {editId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(todo.id)}
                      className="px-4 py-2 bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors duration-200"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-200"
                    >
                      CANCEL
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(todo)}
                      className="px-4 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-200"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => dispatch(removeTodo(todo.id))}
                      className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 transition-colors duration-200"
                    >
                      DELETE
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {todos.length > 0 && (
        <div className="mt-12 pt-8 border-t border-white">
          <div className="flex justify-between text-white">
            <span className="text-lg">TOTAL TASKS: <span className="font-bold">{todos.length}</span></span>
            <span className="text-lg">COMPLETED: <span className="font-bold text-cyan-400">0</span></span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Todo