import { FC, useEffect, useState } from 'react';
import style from './User.module.css';
import { useParams } from 'react-router-dom';
import { updateProfileStatusAsyncThunk } from '../../../redux/reducers/profile';
import { useAppDispatch } from '../../../hooks/hooks';

const UserStatus:FC<{status: string}> = ({status}) => {
  const [editeMode, setEditeMode] = useState(false);
  const [sts, setStatus] = useState(status);
  let dispatch = useAppDispatch();
  let isOwner = useParams().userId;
  const disableEditeMode = () =>{
    setEditeMode(false);
    dispatch(updateProfileStatusAsyncThunk(sts));
  }

  useEffect(() => {
    setStatus(status);
  }, [status])
  
  return (
    <div>
      {!editeMode 
      ? <div onDoubleClick={() => !isOwner && setEditeMode(true)}>Status: {status || '...'}</div> 
      : <div><input autoFocus={true} onBlur={disableEditeMode} className={style.input} value={sts} onChange={(e) => setStatus(e.target.value)}/></div>}
    </div>
  )
}
export default UserStatus;