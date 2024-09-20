"use client";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Modal } from "@/components/modal";
import { DeleteModal } from "@/components/deleteModal";
import { LuTrash } from "react-icons/lu";
import { v4 as uuidv4 } from 'uuid'; 

interface Task {
  id: string; 
  text: string;
  completed: boolean;
}

export function Task() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleNewTask = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, { id: uuidv4(), text: newTask, completed: false }]); 
      setNewTask("");
      setShowModal(false);
    }
  };

  const toggleTaskCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteClick = (id: string) => {
    setTaskToDelete(id); 
    setShowDeleteModal(true); 
  };

  const handleDeleteTask = () => {
    if (taskToDelete !== null) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete)); 
      setTaskToDelete(null); 
      setShowDeleteModal(false); 
    }
  };

  const incompleteTasks = tasks.filter((task) => !task.completed); 
  const completedTasks = tasks.filter((task) => task.completed); 

  return (
    <div className={styles.page}>
      
      <button className={styles.addButton} onClick={handleNewTask}>
        Adicionar nova tarefa
      </button>

      
      {(incompleteTasks.length > 0 || completedTasks.length > 0) && (
        <div className={styles.container}>
          {incompleteTasks.length > 0 && (
            <>
              <h1 className={styles.title}>Suas tarefas de hoje</h1>
              {incompleteTasks.map((task) => (
                <div key={task.id} className={styles.checkboxContainer}>
                  <input
                    title="checkbox"
                    type="checkbox"
                    className={styles.checkbox}
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className={styles.taskText}>{task.text}</span>
                  <LuTrash
                    size={25}
                    className={styles.trashIcon}
                    onClick={() => handleDeleteClick(task.id)}
                  />
                </div>
              ))}
            </>
          )}

          {completedTasks.length > 0 && (
            <>
              <h1 className={styles.title}>Tarefas Finalizadas</h1>
              {completedTasks.map((task) => (
                <div key={task.id} className={styles.checkboxContainer}>
                  <input
                    title="checkbox"
                    type="checkbox"
                    className={styles.checkbox}
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <span className={`${styles.taskText} ${styles.completedTaskText}`}>
                    {task.text}
                  </span>
                  <LuTrash
                    size={25}
                    className={styles.trashIcon}
                    onClick={() => handleDeleteClick(task.id)}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title="Nova Tarefa"
        onAdd={handleAddTask}
      >
        <h2>Título</h2>
        <input
          className={styles.taskInput}
          type="text"
          placeholder="Digite"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </Modal>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
