import { useController, UseControllerProps } from "react-hook-form";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormValuesType } from './FormValuesType'

interface Icbox {
  value: string;
  label: string;
  labelPlacement?: "end" | "start" | "top" | "bottom" | undefined
}

const Cbox = (props: Icbox & UseControllerProps<FormValuesType>) => {
  const {field} = useController(props);
  return (
    <FormControlLabel 
      {...field} 
      value={props.value}
      control={<Checkbox name={props.name} checked={Boolean(field.value)} />} 
      label={props.label} 
      labelPlacement={props.labelPlacement}
    />
  );
}

export default Cbox;