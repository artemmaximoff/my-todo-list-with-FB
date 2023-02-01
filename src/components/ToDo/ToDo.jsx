import React from "react";
import { useState } from "react";
import s from '../ToDo/ToDo.module.css'
import { collection, deleteDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useNavigate } from "react-router-dom";



export const ToDo = ({ todo, getTodos }) => {
    const navigate = useNavigate()
    const todosCollectionsTodosRef = collection(db, 'todos')
    const [dateCheck, setDateCheck] = useState(false)


    const updateCurrentTodo = async (id, completed) => {
        const currentTodo = doc(db, 'todos', id)
        console.log(currentTodo);
        await updateDoc(currentTodo, { completed: !completed })
        getTodos()
    }

    const deleteCurrentTodo = async (id) => {
        const currentTodo = doc(db, 'todos', id)
        await deleteDoc(currentTodo)
        getTodos()
    }


    return (
        <div >
            <div className={todo.completed === true ? s.todoCompleted : s.todo} >

                <div className={s.todoInfo} >
                    <div >
                        <input disabled={dateCheck ? true : false}
                            onChange={() => updateCurrentTodo(todo.id, todo.completed)}
                            checked={todo.completed}
                            type="checkbox"></input>
                    </div>

                    <div className={s.todoBody}>
                        <div onClick={() => navigate(`/todos/todo/${todo.id}`)}
                            className={todo.completed ? s.todoBodyTitleCompleted : s.todoBodyTitle} >{todo.title}
                        </div>
                        <hr></hr>
                        <div className={todo.completed ? s.todoBodyDectriptionCompleted : s.todoBodyDectription} >{todo.description}</div>
                        {todo.file && <div className={s.todoAttachment} >
                            <a href={todo.file}>Attachment</a>
                        </div>}
                        <span>Дата завершения: </span>
                        <span >{todo.date}</span>
                        <span>{todo.time}</span>
                        {todo.expired && <span>(время вышло)</span>}
                    </div>
                </div>
                <button className={s.todoButton} onClick={() => deleteCurrentTodo(todo.id)}>X</button>
            </div >

        </div >

    )
}
