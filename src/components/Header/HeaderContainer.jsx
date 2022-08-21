import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { logOutThunkCreator } from '../../redux/auth-reducer';

const HeaderContainer = () => {
  let login = useSelector(state => state.auth.login)
  let isAuth = useSelector(state => state.auth.isAuth)
  let photo = useSelector(state => state.auth.photo)

  let dispatch = useDispatch()

  const onClickLogOut = () => {
    dispatch(logOutThunkCreator());
  }
  return(
    <Header login={login} isAuth={isAuth} photo={photo} onClickLogOut={onClickLogOut}/>
  );
}

export default HeaderContainer;
