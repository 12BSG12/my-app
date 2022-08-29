import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { useController, UseControllerProps } from "react-hook-form";
import FormHelperText from '@mui/material/FormHelperText';
import { FormValuesType } from './FormValuesType'

const Password = (props: UseControllerProps<FormValuesType>) =>{
  const {field, fieldState: {error}} = useController(props);

  const [values, setValues] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ mt: 2, width: '100%' }} variant="outlined" error={Boolean(error)}>
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        {...field}
        id="outlined-adornment-password"
        type={values.showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      <FormHelperText id="outlined-weight-helper-text">{error && (error?.message || 'Некорректный ввод')}</FormHelperText>
    </FormControl>
  );
}

export default Password;