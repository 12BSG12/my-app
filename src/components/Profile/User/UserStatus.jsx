import { useEffect, useState } from 'react';
import style from './User.module.css';

const UserStatus = ({status, updateProfileStatusThunkCreator}) => {
  const [editeMode, setEditeMode] = useState(false);
  const [sts, setStatus] = useState(status);
  const disableEditeMode = () =>{
    setEditeMode(false);
    updateProfileStatusThunkCreator(sts);
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