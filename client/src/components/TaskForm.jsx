import React, { useState, useEffect } from "react";
import "../App.css";

export default function TaskForm({ onSubmit, initialData }) {
  const [taskId, setTaskId] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTaskId(initialData.id);
      setTaskName(initialData.title);
      setTaskDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName.trim() || !taskDescription.trim()) {
      alert("Por favor, completa todos los campos."); // Validamos que no se envíen campos vacíos
      return;
    }

    onSubmit({ id: taskId, title: taskName, description: taskDescription });
    setTaskId(0);
    setTaskName("");
    setTaskDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="crearTarea"
        type="text"
        placeholder="Tarea"
        onChange={(e) => setTaskName(e.target.value)}
        value={taskName}
      />
      <input
        className="crearTarea"
        type="text"
        placeholder="Descripción"
        onChange={(e) => setTaskDescription(e.target.value)}
        value={taskDescription}
      />
      <button className="CreateTodoButton" type="submit">
        {initialData ? "Guardar Cambios" : "Crear"}
      </button>
    </form>
  );
}
