import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../authSlice';
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {
    const userInfo = useSelector(selectLoggedInUser);
    if(!userInfo){
        return <Navigate to="/login" replace={true}></Navigate>
    }
  return (
    children
  )
}

export default Protected