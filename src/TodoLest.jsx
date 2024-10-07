import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodoListWithImage({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedName = localStorage.getItem('employeeName');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedName) {
      setEmployeeName(savedName);
    }
  }, []);

  function handleToggleDetails(e) {
    setNewTask(e.target.value);
  }

  function handleNameChange(e) {
    const name = e.target.value;
    setEmployeeName(name);
    localStorage.setItem('employeeName', name);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function addTask() {
    if (newTask.trim() !== "" && employeeName.trim() !== "") {
      const updatedTasks = [...tasks, { text: newTask, completed: false, employee: employeeName, image: selectedImage }];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setNewTask("");
      setSelectedImage(null);
      toast.success("تم إضافة المهمة بنجاح!");
    } else {
      toast.error("يرجى إدخال اسم الموظف والمهمة.");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.error("تم حذف المهمة بنجاح!");
  }

  function markAsDone(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.success("تم إتمام المهمة بنجاح!");
  }

  // دالة لإعادة المهمة إلى حالتها غير المكتملة
  function markAsUndone(index) {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = false;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    toast.info("تم إعادة المهمة إلى حالتها الأصلية.");
  }

  const handleLogout = () => {
    localStorage.removeItem('employeeName');
    localStorage.removeItem('tasks');
    setTasks([]);
    setEmployeeName("");
    onLogout();
    toast.info("تم تسجيل الخروج بنجاح!");
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h1 className="text-center mb-4">To-Do List</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="اسم الموظف"
            value={employeeName}
            onChange={handleNameChange}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={newTask}
            placeholder="Add a task"
            onChange={handleToggleDetails}
          />
          <button className="btn btn-primary" onClick={addTask}>Add</button>
        </div>

        <div className="input-group mb-3">
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>

        {selectedImage && (
          <div className="mb-3">
            <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </div>
        )}

        <ul className="list-group">
          {tasks
            .filter(task => task.employee === employeeName)
            .map((task, index) => (
              <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-success text-white' : ''}`}>
                <div>
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
                  {task.image && (
                    <div className="mt-2">
                      <img src={task.image} alt="Task" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div>
                  )}
                </div>
                <div className='d-flex gap-3'>
                  <button className="btn btn-success btn-sm" onClick={() => markAsDone(index)} disabled={task.completed}>Done</button>
                  <button className="btn btn-warning btn-sm" onClick={() => markAsUndone(index)} disabled={!task.completed}>Undo</button> {/* زر إعادة المهمة */}
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Delete</button>
                </div>
              </li>
            ))}
        </ul>
        <button className="btn btn-danger mt-3 w-25" onClick={handleLogout}>تسجيل الخروج</button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}
