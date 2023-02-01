import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useToDos } from "../hooks/useToDos";
import s from '../navbar/navbar.module.css'



export const Navbar = () => {

    const { clearTodosCompleted, todosActive, activeTodosCounter } = useToDos()
    const location = useLocation();

    return (
        <div className={s.navbar}>
            <div className={s.counter}>{activeTodosCounter} items left</div>
            <div className={s.navbarLinks}>
                <Link to='/alltodos' className={location.pathname == '/alltodos' ? s.navbarLinkActive : s.navbarLink}>All</Link>
                <Link to='/activetodos' className={location.pathname === '/activetodos' ? s.navbarLinkActive : s.navbarLink} >Active</Link>
                <Link to='/copmletedtodos' className={location.pathname == '/copmletedtodos' ? s.navbarLinkActive : s.navbarLink} >Completed</Link>

            </div>
            <button onClick={clearTodosCompleted}>clear Completed</button>
        </div>
    )
}