import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleLogin = () => {
    if (name.trim() !== "" && id.trim() !== "") {
      localStorage.setItem('employeeName', name);
      localStorage.setItem('employeeId', id);
      onLogin(); // استدعاء دالة تسجيل الدخول
      toast.success("تم تسجيل الدخول بنجاح!"); // إشعار النجاح
    } else {
      toast.error("يرجى إدخال الاسم ومعرف Id."); // إشعار الخطأ
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h1 className="text-center mb-4">تسجيل الدخول</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>تسجيل الدخول</button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
