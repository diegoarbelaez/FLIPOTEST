import React, { useState } from "react";
import "../App.css";

export default function TaskList({ tasks, onEdit, onDelete, onFinish }) {
  return (
    <div className="listaTareas">
      <h1>Lista de Tareas</h1>
      {tasks.length === 0 && <h2>No hay tareas al momento...</h2>}
      {tasks.map((task) => (
        <div className={task.done ? "card-done" : "card-pending"} key={task.id}>
          <p>
            <span className="labelTarea">Nombre de la Tarea:</span> {task.title}
          </p>
          <p>
            <span className="labelTarea">Descripción:</span> {task.description}
          </p>
          <p>
            <span className="labelTarea">Estado:</span>{" "}
            {task.done ? "Terminada" : "Sin Terminar"}
          </p>
          <button
            className="botonEliminar"
            onClick={() => {
              onDelete(task.id);
            }}
          >
            Eliminar
          </button>
          <button
            className="botonEditar"
            hidden={task.done}
            onClick={() => {
              onEdit(task);
              isEditing(!isEditing);
            }}
          >
            Editar
          </button>
          <button
            className="botonTerminar"
            hidden={task.done}
            onClick={() => {
              onFinish(task);
            }}
          >
            Terminar
          </button>
        </div>
      ))}
    </div>
  );
}
