import React, { useEffect, useState } from "react";
import "./Main.css";
import uuid from "react-uuid";
import { AiFillDelete } from "react-icons/ai";

const Main = () => {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks"))
     || [])
  
  const [newTaskContent, setNewTaskContent] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(() => JSON.parse(localStorage.getItem("completed")) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completedTasks));
  }, [completedTasks])

  const createTask = () => {
    const newTask = {
      id: uuid(),
      content: newTaskContent,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskContent("");
  };

  const handleInputChange = (event) => {
    setNewTaskContent(event.target.value);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        const updatedTask = { ...task, completed: !task.completed };
        if (updatedTask.completed) {
          setCompletedTasks([...completedTasks, updatedTask]);
        } else {
          setCompletedTasks((prevState) =>
            prevState.filter((completedTask) => completedTask.id !== taskId)
          );
        }
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    setCompletedTasks(
      completedTasks.filter((completed) => completed.id !== id)
    );
  };

  const renderTasks = tasks.map((task) => {
    if (!task.completed) {
      return (
        <li key={task.id}>
          <input
            className="check"
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id)}
          />
          <p>
            <span className="content">{task.content}</span>
          </p>
        </li>
      );
    }
    return null;
  });

  return (
    <main>
      <div className="container">
        <h1>To Do List</h1>
        <div className="clear">
          <button onClick={() => setTasks([])}>
            <AiFillDelete />
            Clear List
          </button>
        </div>
        <div className="top">
          <strong>
            <label htmlFor="create">Create task: </label>
          </strong>
          <input
            autoFocus
            type="text"
            name="create"
            value={newTaskContent}
            onChange={handleInputChange}
          />
          <button onClick={createTask}>Create</button>
        </div>

        <hr />
        <section>
          <div className="left">
            <h3>List</h3>
            <ul className="list">{renderTasks}</ul>
          </div>
          <div className="right">
            <h3>Completed</h3>
            <ul className="list">
              {completedTasks.map((task) => (
                <>
                <li key={task.id}>
                  <span className="completed">{task.content}</span>
                  <AiFillDelete
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  />
                </li>
                
                </>
              ))}
            </ul>
          </div>
        </section>
      </div>
      <div className="credit">
        <h3>Made by Aashrya Sigdel</h3>
      </div>
    </main>
  );
};

export default Main;
