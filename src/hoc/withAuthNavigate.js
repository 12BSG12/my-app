import { Navigate } from 'react-router-dom';
import {connect} from 'react-redux'

const mapStateToPropsForNavigate = (state) =>({
  isAuth: state.auth.isAuth
});

export const withAuthNavigate = (WrappedComponent) => {
  const NavigateComponent = (props) => {
    if(!props.isAuth) return <Navigate to='/login'/>
    return <WrappedComponent {...props} />;
  } 
  return connect(mapStateToPropsForNavigate)(NavigateComponent);
}