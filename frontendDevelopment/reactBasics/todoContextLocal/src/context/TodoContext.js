import {useContext,createContext,useState} from 'react'

export const TodoContext=createContext({
    todos:[
        {
            id:1,
            todo:"Todo Message 1",
            isCompleted:true
        },
        {
            id:2,
            todo:"Todo Message 2",
            isCompleted:true
        },
        {
            id:3,
            todo:"Todo Message 3",
            isCompleted:true
        }
    ],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}
});

export const TodoContextProvider=TodoContext.Provider;

export const useTodo=()=>{
    return useContext(TodoContext);
}

