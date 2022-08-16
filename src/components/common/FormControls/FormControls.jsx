import style from './FormControl.module.css';

export const Element = (Element) => ({input, meta,...props}) => {
  const hasError = meta.touched && meta.error;
  return(
    <>
      <Element className={ '' + (hasError ? style.error : "")} {...input} {...props}/>
      {hasError && <div className={style.errorText}>{meta.error}</div>}
    </>
  )
}