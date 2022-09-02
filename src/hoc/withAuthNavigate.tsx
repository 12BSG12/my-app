import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

export const withAuthNavigate = (WrappedComponent: React.ComponentType) => {
  const NavigateComponent = () => {
    const location = useLocation()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    if(!isAuth) return <Navigate to='/login' state={{from: location.pathname}}/>
    return <WrappedComponent />;
  } 
  return NavigateComponent;
}