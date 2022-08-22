import TextField from '@mui/material/TextField';
import { useController } from "react-hook-form";

const Input = (props) => {
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

export default Input;