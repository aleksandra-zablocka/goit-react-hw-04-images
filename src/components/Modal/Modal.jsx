import css from './Modal.module.css';
import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';

const Modal = ({ toggleModal, src, alt }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      toggleModal();
    }
  };

  const handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div>
      <div className={css.overlay} onClick={handleBackDropClick}>
        <div className={css.modal}>
          {!isImageLoaded && <Loader />}
          <img
            className={css.image}
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
