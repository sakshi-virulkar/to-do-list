import React from 'react'
import Todo from './Todo'


function ToDoList({todos, toggleTodo}) {
    return (
        <div>
            {todos.map(todo => (<Todo toggleTodo = {toggleTodo} key = {todo.id} todo = {todo}/>))}
        </div>
    )
}

export default ToDoList
