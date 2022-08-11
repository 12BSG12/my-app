import style from './Preloader.module.css';
import preloader from '../../../assets/images/preloader-img.svg';


const Preloader = () => {
  return (
    <div className={style.preloader}>
      <img className={style.img} src={preloader} alt=''/>
    </div>
  );
}

export default Preloader;

