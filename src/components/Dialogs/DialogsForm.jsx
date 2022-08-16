import style from './Dialogs.module.css';
import { Field, reduxForm } from 'redux-form'

const DialogsForm = (props) => {  
  return (
    <form className={style.body} onSubmit={props.handleSubmit}>
      <Field className={style.textarea} component="textarea" name='message' placeholder='Write a message...'/>
      <button className={style.btn}>Send</button>
    </form>
  );
} 

const DialogsReduxForm = reduxForm({
  form: 'dialogs'
})(DialogsForm)
export default DialogsReduxForm;
