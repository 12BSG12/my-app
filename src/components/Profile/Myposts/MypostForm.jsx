import style from './Mypost.module.css';
import { Field, reduxForm } from 'redux-form'

const MyPostForm = (props) => {
  return (
    <form className={style.form} onSubmit={props.handleSubmit}>
      <label className={style.title}>My posts</label>
      <Field className={style.textarea} component="textarea" name="message" placeholder="your news..."/>
      <button className={style.btn}>Send</button> 
    </form>
  );
} 
const MyPostReduxForm = reduxForm({
  form: 'login'
})(MyPostForm)
export default MyPostReduxForm;
