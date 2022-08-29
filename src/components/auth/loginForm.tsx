import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Input from '../common/formControl/Input';
import { loginAsyncThunk } from '../../redux/reducers/auth';
import Checkbox from '../common/formControl/Checkbox'
import Button from '@mui/material/Button';
import Password from "../common/formControl/Password";
import style from './login.module.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FormValuesType } from '../common/formControl/FormValuesType';

const LoginReduxForm = () => {
  let dispatch = useAppDispatch();
  let captchaURL = useAppSelector(state => state.auth.captchaURL);
  let messageError = useAppSelector(state => state.auth.messageError);
  const { 
    control, 
    handleSubmit,
    register,
    formState: { isValid } 
  } = useForm<FormValuesType>({
    defaultValues: {
      rememberMe: false,
      password: ''
    },
    mode: 'onBlur'
  });

  const onSubmit = (formData: FormValuesType) => {
    dispatch(loginAsyncThunk({email: formData.email, password: formData.password, rememberMe: formData.rememberMe, captcha: formData.captcha}));
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