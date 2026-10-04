import TodoItem from "./TodoItem";

function TodoList({
  todos,
  onToggle,
  onUpdate,
  onDelete,
}) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No todos yet</h3>
        <p>Create your first todo above.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;