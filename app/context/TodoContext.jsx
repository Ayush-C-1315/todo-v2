import { useState, createContext, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import todos from "../data/todoData";
import React from "react";

const TodoContext = createContext({});
const TodoProvider = ({ children }) => {
  const [todoState, setTodo] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("Todo");
        const storedTodos = jsonData ? JSON.parse(jsonData) : null;

        // If no todos are found, set the default todos
        if (!storedTodos || storedTodos.length === 0) {
          await AsyncStorage.setItem("Todo", JSON.stringify(todos));
          setTodo(todos);
        } else {
          setTodo(storedTodos);
        }
      } catch (e) {
        console.error(e);
      }
    };

    getTodos();
  }, []);

  useEffect(() => {
    const setTodos = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("Todo");
        if (jsonData !== null) {
          const storedTodos = JSON.parse(jsonData);
          await AsyncStorage.removeItem("Todo");
          await AsyncStorage.setItem("Todo", JSON.stringify(todoState));
        } else {
          await AsyncStorage.setItem(
            "Todo",
            JSON.stringify(todoState.length ? todoState : todos)
          );
        }
      } catch (e) {
        console.error(e);
      }
    };
    setTodos();
  }, [todoState]);

  const toggleTodo = (id) => {
    setTodo((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = ({ title, description }) => {
    setTodo((prev) => [
      ...prev,
      { id: prev.length + 1, title, description, completed: false },
    ]);
  };
  return (
    <TodoContext.Provider value={{ todoState, toggleTodo, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
export default TodoProvider;
