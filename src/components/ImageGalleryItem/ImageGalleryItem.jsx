import css from './ImageGalleryItem.module.css';
import Modal from '../Modal/Modal';
import Loader from 'components/Loader/Loader';
import { useState } from 'react';

const ImageGalleryItem = ({ src, alt, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <li className={css.imageGalleryItem}>
      {!isImageLoaded && <Loader />}
      <img
        className={css.imageGalleryItemImage}
        src={src}
        alt={alt}
        onClick={toggleModal}
        onLoad={handleImageLoad}
      />
      {isModalOpen && (
        <Modal src={largeImageURL} alt={alt} toggleModal={toggleModal} />
      )}
    </li>
  );
};

export default ImageGalleryItem;
