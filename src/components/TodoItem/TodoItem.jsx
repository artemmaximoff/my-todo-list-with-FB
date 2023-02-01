import React from "react";
import { useState } from "react";
import s from '../TodoItem/TodoItem.module.css'
import { collection, getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useParams } from "react-router";
import { useEffect } from "react";




export const TodoItem = () => {

    const [todo, setTodo] = useState({})
    const params = useParams();
    const todoId = params.todoId

    const docRef = doc(db, 'todos', todoId)
    const getTodo = async () => {
        const data = await getDoc(docRef)
        const todoData = data.data()
        setTodo(todoData)
    }

    useEffect(() => {
        getTodo()
    }, [])
    return (
        <div className={todo.completed === true ? s.todoItemCompleted : s.todoItem} >
            <h4>What needs to be done:</h4>
            <div className={s.todoTitle}>{todo.title}</div>
            <h4>Details:</h4>
            <div className={s.todoDescription} >{todo.description}</div>
            <h4>Attachments:</h4>
            <div className={s.todoDescription}>
                {todo.file ? <a href={todo.file}>File</a> : <span>none</span>}
            </div>
            <h4>Date completed:</h4>

            <div className={s.todoDate}>
                <span >{todo.date} </span>
                <span >{todo.time}</span>

            </div>
        </div >

    )
}

export default TodoItem