import Users from './Users';
import { getUsersThunkCreator, changePageThunkCreator, unFollowThunkCreator, followThunkCreator } from '../../redux/users-reducer';
import Preloader from '../common/Preloader/Preloader';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { getUsers, getPage, getTotalCount, getCurrentPage, getIsFetching, getFollowind } from '../../redux/selectors/users';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const UsersContainer = () => {
  let usersData = useSelector(state => getUsers(state));
  let pageSize = useSelector(state => getPage(state));
  let totalCount = useSelector(state => getTotalCount(state));
  let currentPage = useSelector(state => getCurrentPage(state));
  let isFetching = useSelector(state => getIsFetching(state));
  let followindInProgress = useSelector(state => getFollowind(state));
  
  let dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getUsersThunkCreator(currentPage, pageSize))
  }, [dispatch, currentPage, pageSize]);

  const changePage = (page) => dispatch(changePageThunkCreator(page, pageSize));

  const unFollow = (id) => dispatch(unFollowThunkCreator(id));

  const follow = (id) => dispatch(followThunkCreator(id));

  let pagesCount = Math.ceil(totalCount / pageSize);
  return(
    <>
      {isFetching ? <Preloader /> : <Users  
      follow={follow}
      unFollow={unFollow}
      pagesCount={pagesCount}
      changePage={changePage}
      {...{usersData, currentPage, isFetching, followindInProgress}}
      />}
    </>
  );
}

export default withAuthNavigate(UsersContainer);
