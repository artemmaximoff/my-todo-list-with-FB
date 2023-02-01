import React from "react";
import { useState } from 'react'
import s from '../AddToDo/AddToDo.module.css'
import { db } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { storage } from '../../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useRef } from 'react'

export const AddToDo = ({ todos, getTodos }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [error, setError] = useState('')
    const [fileUrl, setFileUrl] = useState()
    const [fileLoaded, setFileLoaded] = useState(false)
    const todosCollectionsTodosRef = collection(db, 'todos')
    const inputFieldRef = useRef()
    const progressFielRef = useRef()



    const uploadFile = async (e) => {
        const file = e.target.files[0]
        setFileLoaded(true)
        if (file) {
            const fileRef = ref(storage, `files/${file.name}`)
            uploadBytes(fileRef, file).then(() => {
                getDownloadURL(fileRef).then((url) => {
                    setFileUrl(url)
                })
            })
        } else {
            setFileLoaded(false)
            setFileUrl("")
        }

    }

    const createNewTodo = async (e) => {
        e.preventDefault()
        const file = inputFieldRef.current.value
        const currentDate = new Date();
        const inputDate = new Date(date + " " + time)
        if (title.trim().length == 0) {
            setError('Please enter valid title')
            return
        }
        if (!fileUrl && file) {
            setError('Please waiting for a file being loaded')
            return
        }

        if (currentDate >= inputDate) {
            setError('Please enter valid time and date')
            return
        }
        if (!date || !time) {
            setError('Please enter valid time and date')
            return
        }

        const newTodo = {
            title,
            description,
            completed: false,
            id: todos.length + 1,
            date: date + " " + time,
            file: fileUrl || null,
        }

        await addDoc(todosCollectionsTodosRef, newTodo)
        getTodos()
        setTitle("")
        setDescription("")
        setDate("")
        setTime("")
        setError("")
        setFileUrl("")
        setFileLoaded(false)
        progressFielRef.value = 0
        inputFieldRef.current.value = ""
    }

    return (
        <div>
            <button className={s.formButton} onClick={createNewTodo}>+</button>
            <div className={s.error}>{error}</div>
            <form className={s.form}>
                <div className={s.inputBlock}>
                    <input onChange={e => setTitle(e.target.value)} type="text" placeholder="What needs to be done?" value={title}></input>
                    <textarea onChange={e => setDescription(e.target.value)} placeholder="Enter details" value={description}></textarea>
                    <label className={s.inputFile}>
                        <input type='file' onChange={uploadFile} ref={inputFieldRef}></input>
                        <span className={s.inputFileBtn}>Select file</span>
                    </label>
                    {fileLoaded && <progress className={s.progress} ref={progressFielRef} value={fileUrl ? 100 : 0} max="100" />}
                    <input type='date' onChange={e => setDate(e.target.value)} value={date}></input>
                    <input type="time" onChange={e => setTime(e.target.value)} value={time} ></input>
                </div>
            </form >
        </div >

    )
}
