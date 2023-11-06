import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrash, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import './App.css';

function App() {
  const [toDo, setToDo] = useState([
    { id: 2, title: "Task 2", status: false },
    { id: 1, title: "Task 1", status: false }
  ]);

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null); 

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: Date.now(),
        title: newTask,
        status: false,
      };

      setToDo([...toDo, newTaskObj]);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    const updatedToDo = toDo.filter((task) => task.id !== id);
    setToDo(updatedToDo);
  };

  const markDone = (id) => {
    const updatedToDo = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: true };
      }
      return task;
    });
    setToDo(updatedToDo);
  };

  const cancelUpdate = () => {
    setUpdateData('');
    setEditingTaskId(null);
  };

  const changeTask = (e) => {
    setNewTask(e.target.value);
  };

  const updateTask = () => {
    if (updateData.trim() !== '') {
      const updatedToDo = toDo.map((task) => {
        if (task.id === editingTaskId) {
          return { ...task, title: updateData };
        }
        return task;
      });
      setToDo(updatedToDo);

      setUpdateData('');
      setEditingTaskId(null);
    }
  };

  return (
    <div className="container App">
      <br />
      <h2>To do app</h2>
      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control form-control-lg"
            value={newTask}
            onChange={(e) => changeTask(e)}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-lg btn-success me-2" onClick={() => addTask()}>
            Add Task
          </button>
        </div>
      </div>
      {toDo && toDo.length ? (
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className={`col taskBg ${task.status ? 'done' : ''}`}>
                  <span className="taskNumber">{index + 1}</span>
                  <span className="taskText">{task.title}</span>
                  <div className="iconsWrap">
                    {task.status ? (
                      <span title="Not Completed" onClick={() => markDone(task.id)}>
                        <FontAwesomeIcon icon={faCircleCheck} style={{ visibility: 'hidden' }} />
                      </span>
                    ) : (
                      <span title="Completed" onClick={() => markDone(task.id)}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </span>
                    )}

                    <span title="Edit" onClick={() => setEditingTaskId(task.id)}>
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                    <span title="Delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </div>
                </div>
                {editingTaskId === task.id && (
                  <div className="row mb-3">
                    <div className="col">
                      <input
                        className="form-control form-control-lg"
                        value={updateData}
                        onChange={(e) => setUpdateData(e.target.value)}
                      />
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-lg btn-success"
                        onClick={() => updateTask()}
                      >
                        Update Task
                      </button>
                      {editingTaskId !== null && (
                        <button className="btn btn-lg btn-warning" onClick={() => cancelUpdate()}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })
      ) : (
        <p>No Tasks...</p>
      )}
    </div>
  );
}

export default App;
