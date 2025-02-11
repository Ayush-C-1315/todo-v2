// Import necessary dependencies
import { useState, createContext, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import initial todo data
import todos from "../data/todoData";
import React from "react";

// Create a context for todo data
const TodoContext = createContext({});

// Create a provider for the todo context
const TodoProvider = ({ children }) => {
  // Initialize state for todo data
  const [todoState, setTodo] = useState([]);

  // Use effect to load todo data from storage when the component mounts
  useEffect(() => {
    const getTodos = async () => {
      try {
        // Get todo data from storage
        const jsonData = await AsyncStorage.getItem("Todo");

        // If data exists, parse and set it as the initial state
        if (jsonData !== null) {
          const storedTodos = JSON.parse(jsonData);
          if (storedTodos.length > 0) {
            setTodo(storedTodos);
          }
        } else {
          // If no data exists, set the initial state to the default todo data
          await AsyncStorage.setItem("Todo", JSON.stringify(todos));
          setTodo(todos);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getTodos();
  }, []);

  // Use effect to save todo data to storage whenever the state changes
  useEffect(() => {
    const setTodos = async () => {
      try {
        // Get todo data from storage
        const jsonData = await AsyncStorage.getItem("Todo");

        // If data exists, remove it and set the new state
        if (jsonData !== null) {
          const storedTodos = JSON.parse(jsonData);
          await AsyncStorage.removeItem("Todo");
          await AsyncStorage.setItem("Todo", JSON.stringify(todoState));
        } else {
          // If no data exists, set the new state as the initial data
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

  // Function to toggle the completion status of a todo item
  const toggleTodo = (id) => {
    setTodo((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Return the context provider with the todo state and toggle function
  return (
    <TodoContext.Provider value={{ todoState, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// Export a hook to use the todo context
export const useTodo = () => useContext(TodoContext);

// Export the todo provider
export default TodoProvider;
