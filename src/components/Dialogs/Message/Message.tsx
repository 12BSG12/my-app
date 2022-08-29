import { FC } from 'react';
import { IMessage } from '../../../models/dialogsType';
import style from './Message.module.css';

const Message: FC<IMessage> = ({message}) => {
  return (
      <div className={style.item}>
        {/* <div className={style.interviewer}>
          <img className={style.img} src="https://via.placeholder.com/50" alt="" />
          <div>
            <div className={style.interviewerName}>Friend</div>
            <p className={style.message}>{message}</p>
          </div>
        </div> */}
        <div className={style.my}>
          <p className={style.message}>{message}</p>
        </div>
      </div>
  );
}

export default Message;
