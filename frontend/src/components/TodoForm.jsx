import { useState } from "react";

function TodoForm({ onTodoCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setLoading(true);

    try {
      await onTodoCreated({
        title: title.trim(),
        description: description.trim(),
      });

      setTitle("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Todo title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={100}
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        maxLength={500}
      />

      <button type="submit" disabled={loading || !title.trim()}>
        {loading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;