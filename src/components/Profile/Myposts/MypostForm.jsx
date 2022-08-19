import style from './Mypost.module.css';
import { Field, reduxForm } from 'redux-form'
import { required, maxLength } from '../../../util/validators/validators';
import { Element } from '../../common/FormControls/FormControls';

const Textarea = Element("textarea");
const max = maxLength(300);

const MyPostForm = ({handleSubmit}) => {
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label className={style.title}>My posts</label>
      <Field className={style.textarea} component={Textarea} name="message" validate={[required, max]} placeholder="your news..."/>
      <button className={style.btn}>Send</button> 
    </form>
  );
} 
const MyPostReduxForm = reduxForm({
  form: 'mypost'
})(MyPostForm)
export default MyPostReduxForm;
