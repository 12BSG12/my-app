import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { logOutAsyncThunk } from '../../redux/reducers/auth';

const HeaderContainer = () => {
  let login = useSelector(state => state.auth.fullName)
  let isAuth = useSelector(state => state.auth.isAuth)
  let photo = useSelector(state => state.auth.photo)

  let dispatch = useDispatch()

  const onClickLogOut = () => {
    dispatch(logOutAsyncThunk());
  }
  return(
    <Header login={login} isAuth={isAuth} photo={photo} onClickLogOut={onClickLogOut}/>
  );
}

export default HeaderContainer;
