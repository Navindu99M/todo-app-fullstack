import { useEffect, useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

import {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from "./services/todoApi";

import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTodos();

      setTodos(data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load todos."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleCreate = async (todo) => {
    try {
      setError("");

      const newTodo = await createTodo(todo);

      setTodos((currentTodos) => [
        newTodo,
        ...currentTodos,
      ]);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create todo."
      );

      throw error;
    }
  };

  const handleUpdate = async (id, todo) => {
    try {
      setError("");

      const updatedTodo = await updateTodo(id, todo);

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item._id === id ? updatedTodo : item
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update todo."
      );
    }
  };

  const handleToggle = async (id) => {
    try {
      setError("");

      const updatedTodo = await toggleTodo(id);

      setTodos((currentTodos) =>
        currentTodos.map((item) =>
          item._id === id ? updatedTodo : item
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update todo status."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteTodo(id);

      setTodos((currentTodos) =>
        currentTodos.filter((item) => item._id !== id)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete todo."
      );
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Todo Manager</h1>
          <p>Manage your daily tasks simply.</p>
        </header>

        <TodoForm onTodoCreated={handleCreate} />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">
            Loading todos...
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;