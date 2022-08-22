import style from './EditForm.module.scss';
import { DevTool } from "@hookform/devtools";
import { useForm, Controller } from "react-hook-form";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '../../../util/validators/Input';

const EditForm = () =>{
  const { 
    control, 
    handleSubmit,
    reset, 
    formState: {isValid } 
  } = useForm({
    defaultValues: {
      FullName: "",
      checkbox: false,
      AboutMe: "",
      Facebook: "",
      Website: "",
      Vk: "",
      Twitter: "",
      Instagram: "",
      Youtube: "",
      Github: "",
      MainLink: ""
    },
    mode: 'onBlur'
  });

  const onSubmit = data => {
    reset();
  }
  return (
    <>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <div>
          <Input control={control} name="FullName" label='Full name' rules={{ 
            required: 'Поле обязательно для заполнения', 
            minLength: {
              value: 2,
              message: 'Минимум 2 символа'
            }, 
            maxLength: {
              value: 40,
              message: 'Максимум 40 символов'
            }, 
            pattern: /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/i }}
          />
        </div>
        <div>
          <Input control={control} name="AboutMe" rows={4} label='About me' rules={{maxLength: {value: 50}}}/>
        </div>
          <Input control={control} name="Facebook" label='Facebook' rules={{maxLength: {value: 50}}}/>
          <Input control={control} name="Vk" label='Vk' rules={{maxLength: {value: 50}}}/>
        <div>
          <Input control={control} name="Twitter" label='Twitter' rules={{maxLength: {value: 50}}}/>
          <Input control={control} name="Instagram" label='Instagram' rules={{maxLength: {value: 50}}}/>
        </div>
        <div>
          <Input control={control} name="Youtube" label='Youtube' rules={{maxLength: {value: 50}}}/>
          <Input control={control} name="Github" label='Github' rules={{maxLength: {value: 50}}}/>
        </div>
        <div>
          <Input control={control} name="MainLink" label='MainLink' rules={{maxLength: {value: 50}}}/>
          <Input control={control} name="Website" label='Website' rules={{maxLength: {value: 50}}}/>
        </div>
        <div>
        <Controller
          name="checkbox"
          control={control}
          render={({ field }) => <FormControlLabel {...field} value="start" control={<Checkbox />} 
          label="Looking for a job"
          labelPlacement="start"/>}
        />
        </div>
        <button className={style.btn} disabled={!isValid}>Send</button>
      </Box>
      <DevTool control={control}/>
    </>
  );
}

export default EditForm;