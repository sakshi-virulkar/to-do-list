import React,{useRef, useState, useEffect} from 'react'
import ToDoList from './components/ToDoList'
import { v4 as uuidv4 } from 'uuid';

  const LOCAL_STORAGE_KEY = "todosApp.todos"

function App() {
  const [todos, setTodos] = useState([{id : 1, name: "todo 1", complete: false},{id: 2, name: "todo 2", complete : false}])
  const todoNameRef = useRef('')

  useEffect(()=>{
    const newTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY, todos));
    setTodos(newTodos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (e) => {
    const name = todoNameRef.current.value
    setTodos(prevTodos => [...prevTodos, {id : uuidv4(), name : name, complete : false}])
    todoNameRef.current.value = "";
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete;
    setTodos(newTodos)
  }

  const clearTodos = () => {
    const newTodos = [...todos];
    const filterTodos = newTodos.filter(todo => !todo.complete)
    setTodos(filterTodos);
  }
  

  return (
    <div>
      <ToDoList toggleTodo = {toggleTodo} todos= {todos}/>
      <input ref = {todoNameRef} type="text" />
      <button onClick = {handleAddTodo}>Add To-Do</button>
      <button onClick = {clearTodos}>Clear Completed</button>
      <h1>{todos.filter(todo => !todo.complete).length} left to do</h1>
    </div>
  )
}

export default App

