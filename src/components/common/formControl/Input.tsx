import TextField from '@mui/material/TextField';
import { useController, UseControllerProps } from "react-hook-form";
import { FormValuesType } from './FormValuesType'

interface Iinput {
  rows?: number
  label: string
}

const Input = (props: Iinput & UseControllerProps<FormValuesType>) => {
  const {field, fieldState: {error}} = useController(props);
  return (
    <TextField 
      {...field}
      multiline
      rows={props.rows}
      error={Boolean(error)}
      label={props.label}
      name={props.name}
      helperText={error && (error?.message || 'Некорректный ввод')}
    />
  );
}

export default Input