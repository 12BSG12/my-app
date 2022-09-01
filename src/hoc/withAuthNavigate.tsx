import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

export const withAuthNavigate = (WrappedComponent: React.ComponentType) => {
  const NavigateComponent = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    if(!isAuth) return <Navigate to='/login'/>
    return <WrappedComponent />;
  } 
  return NavigateComponent;
}