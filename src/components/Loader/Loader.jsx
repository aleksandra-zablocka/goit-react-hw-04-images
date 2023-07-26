import css from './Loader.module.css';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () => {
    return (
      <div className={css.containerStyle}>
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }

export default Loader;
