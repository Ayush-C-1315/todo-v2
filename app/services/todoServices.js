import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getAllTodosService = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todos`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const createTodoService = async ({ title, description }) => {
  try {
    const response = await axios.post(`${BASE_URL}/todos`, {
      title,
      description,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
export const updateTodoService = async ({
  id,
  title,
  description,
  completed,
}) => {
  try {
    const response = await axios.put(`${BASE_URL}/todos/${id}`, {
      title,
      description,
      completed,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getTodoByIdService = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/todos/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const deleteTodoService = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/todos/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
