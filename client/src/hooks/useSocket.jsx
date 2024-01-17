import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:4000");

export const useSocket = (setTasks) => {
  useEffect(() => {
    socket.on("getTasks", (tasks) => {
      setTasks(tasks);
    });

    return () => {
      socket.off("getTasks");
    };
  }, [setTasks]);
  
  return socket;
}