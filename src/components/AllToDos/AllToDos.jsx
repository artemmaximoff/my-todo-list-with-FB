import React from "react";
import { AddToDo } from "../AddToDo/AddToDo";
import s from '../AllToDos/AllToDos.module.css'
import { useToDos } from "../hooks/useToDos";
import { ToDo } from "../ToDo/ToDo";



export const AllToDos = () => {
    const { todos, getTodos } = useToDos()

    return (
        <div className={s.container}>
            <AddToDo getTodos={getTodos} todos={todos} />
            {todos.map(todo => <ToDo key={todo.id} getTodos={getTodos} todo={todo} />)}

        </div>
    )
}
