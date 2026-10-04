import axios from "axios";

//const API_URL = "http://localhost:5000/api/todos";
const API_URL = `${import.meta.env.VITE_API_URL}/todos`;

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data.data;
};

export const createTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data.data;
};

export const toggleTodo = async (id) => {
  const response = await axios.patch(`${API_URL}/${id}/done`);
  return response.data.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};