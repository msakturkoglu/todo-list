import React, { useState } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { ITodoModel } from "./models/TodoModel";
import { clearCompleted, createTodo, deleteTodo, updateTodo } from "./redux/slices/todo-slice";
import "./styles.css";

type FormElement = React.FormEvent<HTMLFormElement>;


export default function App() {
  const [value, setValue] = useState<string>("");
  const {data: todoItems = [], isLoading, isError} = useAppSelector(state => state.todos);

  const dispatch = useAppDispatch();


  const addTodo = (text: string): void => {
    dispatch(createTodo({text: value}));
  };

  const removeTodo = (id?: string): void => {
    dispatch(deleteTodo({id}));
  };

  const completeTodo = (todoItem: ITodoModel): void => {
    dispatch(updateTodo({...todoItem, completed: !todoItem.completed}));
  };

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const renderTodos = () => {
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error!</div>

    return todoItems.map((todo: ITodoModel) => (
        <div className="todoItem" key={todo.id}>
          <label onClick={() => completeTodo(todo)}
          style={{ textDecoration: todo.completed ? "line-through" : "" }}
          >
            {todo.text}
          </label>
          <button onClick={(e) => removeTodo(todo.id)}>Remove</button>
        </div>
      )
    )
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>Add Todo</button>
      </form>
      <div className="todoContainer">
       {renderTodos()}
      </div>
      <button disabled={isLoading} onClick={()=> dispatch(clearCompleted())}>Clear Completed</button>
    </div>
  );
}
