import Header from "./Header";
import { logOutAsyncThunk } from '../../redux/reducers/auth';
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";

const HeaderContainer = () => {
  let {fullName, isAuth, photo} = useAppSelector(state => state.auth)

  let dispatch = useAppDispatch()

  const onClickLogOut = () => {
    dispatch(logOutAsyncThunk());
  }
  return(
    <Header fullName={fullName} isAuth={isAuth} photo={photo} onClickLogOut={onClickLogOut}/>
  );
}

export default HeaderContainer;
