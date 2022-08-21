import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import style from './User.module.css';

const UserStatus = ({status, updateProfileStatusThunkCreator}) => {
  const [editeMode, setEditeMode] = useState(false);
  const [sts, setStatus] = useState(status);
  let dispatch = useDispatch();
  const disableEditeMode = () =>{
    setEditeMode(false);
    dispatch(updateProfileStatusThunkCreator(sts));
  }

  useEffect(() => {
    setStatus(status);
  }, [status])
  
  return (
    <div>
      {!editeMode 
      ? <div onDoubleClick={() => setEditeMode(true)}>Status: {status || '...'}</div> 
      : <div><input autoFocus={true} onBlur={disableEditeMode} className={style.input} value={sts} onChange={(e) => setStatus(e.target.value)}/></div>}
    </div>
  )
}
export default UserStatus;