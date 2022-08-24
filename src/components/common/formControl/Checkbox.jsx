import { useController } from "react-hook-form";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Cbox = (props) => {
  const {field} = useController(props);
  return (
    <FormControlLabel 
      {...field} 
      value={props.value}
      control={<Checkbox name={props.name} checked={field.value} />} 
      label={props.label} 
      labelPlacement={props.labelPlacement}
    />
  );
}

export default Cbox;