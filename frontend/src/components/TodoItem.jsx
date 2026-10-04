import { useState } from "react";

function TodoItem({
  todo,
  onToggle,
  onUpdate,
  onDelete,
}) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = async () => {
    if (!title.trim()) {
      return;
    }

    await onUpdate(todo._id, {
      title: title.trim(),
      description: description.trim(),
    });

    setEditing(false);
  };

  if (editing) {
    return (
      <div className="todo-item">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <div className="todo-actions">
          <button onClick={handleUpdate}>Save</button>

          <button onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.done ? "completed" : ""}`}>
      <div className="todo-content">
        <h3>{todo.title}</h3>

        {todo.description && (
          <p>{todo.description}</p>
        )}
      </div>

      <div className="todo-actions">
        <button onClick={() => onToggle(todo._id)}>
          {todo.done ? "Undo" : "Done"}
        </button>

        <button onClick={() => setEditing(true)}>
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;