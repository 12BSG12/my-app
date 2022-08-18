import { useEffect, useState } from 'react';
import style from './User.module.css';

const UserStatus = (props) => {
  const [editeMode, setEditeMode] = useState(false)
  const [status, setStatus] = useState(props.status)

  const disableEditeMode = () =>{
    setEditeMode(false);
    props.updateProfileStatusThunkCreator(status);
  }

  useEffect(() => {
    setStatus(props.status);
  }, [props.status])
  
  const sts = !editeMode 
  ? <div onDoubleClick={() => setEditeMode(true)}>Status: {props.status || '...'}</div> 
  : <div><input autoFocus={true} onBlur={disableEditeMode} className={style.input} value={status} onChange={(e) => setStatus(e.target.value)}/></div>;
  return (
    <div>
      {sts}
    </div>
  )
}
export default UserStatus;