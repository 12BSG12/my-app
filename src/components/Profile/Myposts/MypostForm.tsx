import style from './Mypost.module.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { addPost } from '../../../redux/reducers/profile'
import { MyPostFormType } from './MyPostFormType';

const MyPostForm = () => {
  let dispatch = useDispatch();
  const { register, reset, handleSubmit, formState: { errors, isValid} } = useForm<MyPostFormType>({mode: 'onChange'});
  const onSubmit = (formData: MyPostFormType) => {
    dispatch(addPost(formData.message));
    reset();
  }

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.title}>My posts</label>
        <textarea className={style.textarea} 
          {...register("message", {required:true, maxLength: {value: 10, message: 'максимальная длина поста 10 символов'}})}
          placeholder="your news..."
        />
        {errors?.message && <p>{errors.message.message}</p>}
        <button className={style.btn} type="submit" disabled={!isValid}>Send</button> 
      </form>
    </>
  );
} 

export default MyPostForm;
