/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'
import Layout from './layout/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnauthorizedPage from './pages/UnauthorizedPage/UnauthorizedPage'
import Login from './pages/Login/Login'

const  App = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Navigate to='/at/dashboard' />} />
          <Route path='/login' element = { <Login />}/>
          <Route path='/unauthorized' element={<UnauthorizedPage />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} dispatch={dispatch} />}>
            <Route path='/at/*' element={<Layout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
