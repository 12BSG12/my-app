import style from './Dialogs.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import {sendMessage} from '../../redux/dialogs-reducer';

const DialogsForm = () => {
  let dispatch = useDispatch();
  const { register, reset, handleSubmit, formState: { errors, isValid} } = useForm({mode: 'onChange'});
  const onSubmit = (formData) => {
    dispatch(sendMessage(formData.message));
    reset();
  }

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <textarea className={style.textarea} 
          {...register("message", {required:true, maxLength: {value: 10, message: 'максимальная длина поста 10 символов'}})}
          placeholder="write a message..."
        />
        {errors?.message && <p>{errors.message.message}</p>}
        <button className={style.btn} type="submit" disabled={!isValid}>Send</button> 
      </form>
    </>
  );
} 

export default DialogsForm;
