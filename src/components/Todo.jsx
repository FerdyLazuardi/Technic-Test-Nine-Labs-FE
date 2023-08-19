import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import AppContent from "./AppContent";
import AppHeader from "./AppHeader";
import PageTitle from "./PageTitle";
import styles from "../styles/modules/app.module.scss";

const Todo = () => {
  const [tittle, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDeadlineChange = (event) => {
    setDeadline(event.target.value);
  };

  const handleAddTask = async () => {
    if (editTask === null) {
      // Add new task
      const newTask = {
        tittle,
        deadline,
        status: false,
      };
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        console.log(headers);
        const response = await axios.post(
          "http://localhost:8000/api/v1/task/create",
          newTask,
          { headers }
        );
        setTasks([...tasks, response.data.data]);
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    } else {
      // Edit existing task
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const updatedTask = {
          tittle,
          deadline,
          status: editTask.completed,
        };
        await axios.put(
          `http://localhost:8000/api/v1/task/${editTask.id}`,
          updatedTask,
          { headers }
        );

        const updatedTasks = tasks.map((t) =>
          t.id === editTask.id ? { ...t, task, deadline } : t
        );
        setTasks(updatedTasks);
        setEditTask(null);
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }

    // Reset input fields
    setTask("");
    setDeadline("");
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:8000/api/v1/task/${taskId}`, {
        headers,
      });
      const updatedTasks = tasks.filter((t) => t.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleEditTask = (task) => {
    setTask(task.task);
    setDeadline(task.deadline);
    setEditTask(task);
  };

  useEffect(() => {
    // Fetch tasks on component mount
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get("http://localhost:8000/api/v1/task/", {
          headers,
        });
        setTasks(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <>
        <div className="container">
          <PageTitle>TODO List</PageTitle>
          <div className={styles.app__wrapper}>
            <AppHeader />
          </div>
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontSize: "1.4rem",
            },
          }}
        />
      </>
    </div>
  );
};

export default Todo;
