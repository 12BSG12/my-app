import style from './EditForm.module.scss';
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Input from '../../common/formControl/Input';
import Checkbox from '../../common/formControl/Checkbox';
import {setProfileEditAsyncThunk} from '../../../redux/reducers/profile'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { FormValuesType } from '../../common/formControl/FormValuesType';


const EditForm = () =>{
  let data = useAppSelector(state => state.profilePage.userProfileData)
  let dispatch = useAppDispatch()
  const { 
    control, 
    handleSubmit,
    formState: {isValid } 
  } = useForm<FormValuesType>({
    defaultValues: {
      fullName: data?.fullName,
      lookingForAJob: data?.lookingForAJob,
      aboutMe: data?.aboutMe ?? '',
      facebook: data?.contacts?.facebook ?? '',
      website: data?.contacts?.website ?? '',
      vk: data?.contacts?.vk ?? '',
      twitter: data?.contacts?.twitter ?? '',
      instagram: data?.contacts?.instagram ?? '',
      youtube: data?.contacts?.youtube ?? '',
      github: data?.contacts?.github ?? '',
      mainLink: data?.contacts?.mainLink ?? '',
      lookingForAJobDescription: data?.lookingForAJobDescription ?? ''
    },
    mode: 'onBlur'
  });

  const onSubmit = (data: FormValuesType) => dispatch(setProfileEditAsyncThunk(data));

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
          <Input control={control} name="fullName" label='Full name' rules={{ 
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
          <Input control={control} name="aboutMe" rows={4} label='About me' rules={{
            required: 'Поле обязательно для заполнения', 
            maxLength: {value: 100, message: 'Максимальная длина 100 символов'}}}/>
        </div>
          <Input control={control} name="facebook" label='Facebook' rules={{maxLength: {value: 50, message: 'Максимальная длина 50 символов'}}}/>
          <Input control={control} name="vk" label='Vk' rules={{maxLength: {value: 50, message: 'Максимальная длина 50 символов'}}}/>
        <div>
          <Input control={control} name="twitter" label='Twitter' rules={{maxLength: {value: 50, message: 'Максимальная длина 50 символов'}}}/>
          <Input control={control} name="instagram" label='Instagram' rules={{maxLength: {value: 50, message: 'Максимальная длина 50 символов'}}}/>
        </div>
        <div>
          <Input control={control} name="youtube" label='Youtube' rules={{maxLength: {value: 50, message: 'Максимальная длина 50 символов'}}}/>
          <Input control={control} name="github" label='Github' rules={{maxLength: {value: 50, message: 'Максимальная длина 50 символов'}}}/>
        </div>
        <div>
          <Input control={control} name="mainLink" label='MainLink' rules={{maxLength: {value: 50, message: 'Максимальная длина 50 символов'}}}/>
          <Input control={control} name="website" label='Website' rules={{maxLength: {value: 50, message: 'Максимальная длина 50 символов'}}}/>
          <Input control={control} name="lookingForAJobDescription" label='Job description' rules={{ 
            required: 'Поле обязательно для заполнения', 
            maxLength: {
              value: 100,
              message: 'Максимум 100 символов'
            }}}
          />
        </div>
        <div>
          <Checkbox control={control} name="lookingForAJob" label="Looking for a job" value="start" labelPlacement='start'/>
        </div>
        <button className={style.btn} disabled={!isValid}>Send</button>
      </Box>
      <DevTool control={control}/>
    </>
  );
}

export default EditForm;