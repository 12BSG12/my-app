import Header from "./Header";
import { logOutAsyncThunk } from '../../redux/reducers/auth';
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

const HeaderContainer = () => {
  let login = useAppSelector(state => state.auth.fullName)
  let isAuth = useAppSelector(state => state.auth.isAuth)
  let photo = useAppSelector(state => state.auth.photo)

  let dispatch = useAppDispatch()

  const onClickLogOut = () => {
    dispatch(logOutAsyncThunk());
  }
  return(
    <Header login={login} isAuth={isAuth} photo={photo} onClickLogOut={onClickLogOut}/>
  );
}

export default HeaderContainer;
