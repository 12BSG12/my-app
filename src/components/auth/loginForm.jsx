import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Input from '../common/formControl/Input';
import { loginThunkCreator } from '../../redux/auth-reducer';
import Checkbox from '../common/formControl/Checkbox'
import Button from '@mui/material/Button';
import Password from "../common/formControl/Password";
import style from './login.module.scss'
import { useDispatch, useSelector } from "react-redux";

const LoginReduxForm = () => {
  let dispatch = useDispatch();
  let captchaURL = useSelector(state => state.auth.captchaURL);
  let messageError = useSelector(state => state.auth.messageError);
  const { 
    control, 
    handleSubmit,
    register,
    formState: { isValid } 
  } = useForm({
    defaultValues: {
      rememberMe: false,
      password: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = formData => {
    dispatch(loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha));
  };

  return (
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          '& .MuiTextField-root': { mt: 2 , width: '100%' },
        }}
        noValidate
        >
        <div>
          <Input control={control} name="email" label='Email Address' rules={{ 
            required: 'Поле обязательно для заполнения', 
            minLength: {
              value: 2,
              message: 'Минимум 2 символа'
            }, 
            maxLength: {
              value: 40,
              message: 'Максимум 40 символов'
            }, 
            pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/i }}
          />
        </div>
        <Password control={control} name="password" rules={{ required: 'Поле обязательно для заполнения'}}/>
        <div>
          <Checkbox control={control} name="rememberMe" label="Remember me" value="start" labelPlacement='end'/>
        </div>
        {
          messageError && <p className={style.error}>{messageError}</p>
        }
        {
          captchaURL && 
          <div className={style.captcha}>
            <img src={captchaURL} alt=''/> <br/>
            <input {...register("captcha")} type='text' placeholder='Введите текст с картинки...'/>
          </div>
        }
        <Button
          disabled={!isValid}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
  );
}

export default LoginReduxForm;