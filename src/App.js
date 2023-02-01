import React from 'react';
import './App.css';
import { AllToDos } from './components/AllToDos/AllToDos';
import { Route, Routes, Navigate } from "react-router-dom";
import { TodoItem } from './components/TodoItem/TodoItem'


function App() {
  return (
    <div className="App">
      <div className="appContainer">
        <p>todos</p>
        <Routes>
          <Route exact path='/' element={<Navigate to="/todos" />} />
          <Route element={<AllToDos />} path="/todos" />
          <Route element={<TodoItem />} path="/todos/todo/:todoId" />
        </Routes>

      </div>

    </div>
  );
}

export default App;
