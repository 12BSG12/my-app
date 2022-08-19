import style from './Dialogs.module.css';
import { Field, reduxForm } from 'redux-form'
import { Element } from '../common/FormControls/FormControls';
import { required, maxLength } from '../../util/validators/validators';

const Textarea = Element("textarea");
const max = maxLength(300)

const DialogsForm = ({handleSubmit}) => {  
  return (
    <form className={style.body} onSubmit={handleSubmit}>
      <Field className={style.textarea} component={Textarea} name='message' validate={[required, max]} placeholder='Write a message...'/>
      <button className={style.btn}>Send</button>
    </form>
  );
} 

const DialogsReduxForm = reduxForm({
  form: 'dialogs'
})(DialogsForm)
export default DialogsReduxForm;
