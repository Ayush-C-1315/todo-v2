export const initialTosoState = {
  todosLoading: true,
  todos: [],
};

const todoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADING":
      return { ...state, todosLoading: payload };
    case "SET_TODO":
      return { ...state, todos: payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, payload] };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? { ...todo, ...payload } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    default:
      return state;
  }
};
export default todoReducer;
