import { useEffect } from "react";
import { useState } from "react";
import { db } from '../../firebase'
import { collection, getDocs, doc } from 'firebase/firestore'
import React from "react";


export const useToDos = () => {
    const [todos, setTodos] = useState([])
    const todosCollectionsTodosRef = collection(db, 'todos')

    const getTodos = async () => {
        const data = await getDocs(todosCollectionsTodosRef)
        setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        getTodos()

    }, []);


    return { todos, getTodos }
}