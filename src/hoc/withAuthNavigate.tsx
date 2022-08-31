import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';

export const withAuthNavigate = (WrappedComponent: any) => {
  const NavigateComponent = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    if(!isAuth) return <Navigate to='/login'/>
    return <WrappedComponent />;
  } 
  return NavigateComponent;
}