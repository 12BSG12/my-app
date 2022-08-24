import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Input from '../common/formControl/Input';
import { loginThunkCreator } from '../../redux/auth-reducer';
import { useDispatch } from "react-redux";
import Checkbox from '../common/formControl/Checkbox'
import Button from '@mui/material/Button';
import Password from "../common/formControl/Password";

const LoginReduxForm = () =>{

  let dispatch = useDispatch()

  const { 
    control, 
    handleSubmit,
    formState: { isValid } 
  } = useForm({
    defaultValues: {
    },
    mode: 'onBlur'
  });

  const onSubmit = formData => dispatch(loginThunkCreator(formData.email, formData.password, formData.rememberMe));

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