import css from './Button.module.css';
import { useContext } from 'react';
import { ImageContext } from 'context/ImageContext';

const Button = () => {
  const { loadMore } = useContext(ImageContext);

  const handleClick = e => {
    e.preventDefault();
    loadMore();
  };

  return (
    <div className={css.loadMore}>
      <button className={css.button} onClick={handleClick} type="button">
        Load more
      </button>
    </div>
  );
};

export default Button;
