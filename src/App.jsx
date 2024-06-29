import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todo, setTodo] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todo', JSON.stringify({ todo : newList}))
  }

  function handleAddTodo(newTodo) {
    const newTodoList = [...todo, newTodo]
    persistData(newTodoList)
    setTodo(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todo.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodo(newTodoList)
  }

  function handleEditTodo(index) {
    const valuetoBeEdited = todo[index]
    setTodoValue(valuetoBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(() => {
    if(!localStorage) {
      return
    }

    let localTodo = localStorage.getItem('todo')
    if(!localTodo) {
      return 
    }
    localTodo = JSON.parse(localTodo).todo
    setTodo(localTodo)

  }, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodo={handleAddTodo}/>
      <TodoList todo={todo} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} />
    </>
  )
}

export default App
