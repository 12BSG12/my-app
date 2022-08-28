import style from './Dialogs.module.css';
import { useForm, Resolver } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/hooks';
import { sendMessage } from '../../redux/reducers/dialogs';
import React from 'react';

type FormValues = {
  message: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.message ? values : {},
    errors: !values.message
      ? {
          message: {
            type: 'required', 
            maxLength: {
              value: 10, 
              message: 'максимальная длина поста 10 символов'
            }
          },
        }
      : {},
  };
};


const DialogsForm = () => {
  let dispatch = useAppDispatch();
  const { register, reset, handleSubmit, formState: { errors, isValid} } = useForm<FormValues>({resolver, mode: 'onChange'});
  const onSubmit = handleSubmit((formData) => {
    dispatch(sendMessage(formData.message));
    reset();
  });

  return (
    <form className={style.form} onSubmit={onSubmit}>
      <textarea className={style.textarea} 
        {...register("message")}
        placeholder="write a message..."
      />
      {errors?.message && <p>{errors.message.message}</p>}
      <button className={style.btn} type="submit" disabled={!isValid}>Send</button> 
    </form>
  );
} 

export default DialogsForm;
