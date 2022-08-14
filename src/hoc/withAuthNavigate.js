import { Navigate } from 'react-router-dom';
import {connect} from 'react-redux'
import { Component } from 'react';

const mapStateToPropsForNavigate = (state) =>({
  isAuth: state.auth.isAuth
});

// export const withAuthNavigate = (WrappedComponent) => {
//   class NavigateComponent extends Component {
//     render(){
//       if(!this.props.isAuth) return <Navigate to='/login'/>
//       return <WrappedComponent{...this.props}/>
//     }
//   } 
//   return connect(mapStateToPropsForNavigate)(NavigateComponent);
// }

export const withAuthNavigate = (WrappedComponent) => {
  const NavigateComponent = (props) => {
    if(!props.isAuth) return <Navigate to='/login'/> 
    return <WrappedComponent {...props} />;
  } 
  return connect(mapStateToPropsForNavigate)(NavigateComponent);
}
