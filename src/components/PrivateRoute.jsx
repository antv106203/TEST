/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { useEffect } from "react"
import {logout} from "../actions/auth"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = ({ isAuthenticated, dispatch }) => {
    useEffect(() =>{
        if(!isAuthenticated){
            dispatch(logout())
        }
    }, [isAuthenticated, dispatch])

    if (!isAuthenticated) {
        return <Navigate to='/login' />
    } else {
        return <Outlet />
    }
}

export default PrivateRoute