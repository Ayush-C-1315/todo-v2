import { createContext, useContext, useEffect, useReducer } from "react";

import React from "react";

import {
  getAllTodosService,
  updateTodoService,
  createTodoService,
  deleteTodoService,
} from "@/app/services/todoServices";
import todoReducer, { initialTosoState } from "@/app/reducer/todoReducer";
const TodoContext = createContext({});
const TodoProvider = ({ children }) => {
  const [todoState, todoDispatch] = useReducer(todoReducer, initialTosoState);
  useEffect(() => {
    const getTodos = async () => {
      try {
        todoDispatch({ type: "LOADING", payload: true });
        const todoData = await getAllTodosService();
        todoDispatch({ type: "SET_TODO", payload: todoData });
      } catch (e) {
        console.error(e);
      } finally {
        todoDispatch({ type: "LOADING", payload: false });
      }
    };
    getTodos();
  }, []);

  const toggleTodo = async (id) => {
    const todo = todoState.todos.find((todo) => todo.id === id);
    try {
      todoDispatch({ type: "TOGGLE_TODO", payload: id });
      await updateTodoService({ ...todo, completed: !todo.completed });
    } catch (e) {
      console.error(e);
    }
  };

  const updateTodo = async ({ id, title, description }) => {
    try {
      todoDispatch({
        type: "UPDATE_TODO",
        payload: { id, title, description },
      });
      const updateTodo = await updateTodoService({ id, title, description });
    } catch (e) {
      console.error(e);
    }
  };
  const addTodo = async ({ title, description }) => {
    try {
      const response = await createTodoService({ title, description });
      todoDispatch({ type: "ADD_TODO", payload: response });
    } catch (e) {
      console.error(e);
    }
  };
  const deleteTodo = async (id) => {
    try {
      todoDispatch({ type: "DELETE_TODO", payload: id });
      await deleteTodoService(id);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <TodoContext.Provider
      value={{ todoState, toggleTodo, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
export default TodoProvider;
