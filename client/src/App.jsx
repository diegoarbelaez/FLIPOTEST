import React, { useState } from "react";
import { useSocket } from "./hooks/useSocket";
import TaskForm from "./components/Taskform";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const socket = useSocket(setTasks);

  const handleCreateTask = (task) => {
    socket.emit("createTask", { ...task, done: false });
  };

  const handleEditTask = (task) => {
    socket.emit("editTask", {
      id: task.id,
      title: task.title,
      description: task.description,
    });
    setCurrentTask(null);
  };

  const handleDeleteTask = (taskId) => {
    socket.emit("deleteTask", { id: taskId });
  };

  const handleEditButtonClick = (task) => {
    setCurrentTask(task);
  };

  const handleFinishTask = (task) => {
    socket.emit("editTask", {
      id: task.id,
      done: !task.done,
    });
  };

  return (
    <div className="contenedor">
      <div className="creadorTareas">
        <h2>{currentTask ? "Editar Tarea" : "Crear Tarea"}</h2>
        <TaskForm
          onSubmit={currentTask ? handleEditTask : handleCreateTask}
          initialData={currentTask}
        />
      </div>
      <TaskList
        tasks={tasks}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteTask}
        onFinish={handleFinishTask}
      />
    </div>
  );
}
