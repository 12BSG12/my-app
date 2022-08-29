import { useController, UseControllerProps } from "react-hook-form";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormValuesType } from './FormValuesType'
import { Icbox } from "./Icbox";

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