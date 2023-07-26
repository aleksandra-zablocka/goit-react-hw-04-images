import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { useContext } from 'react';
import { ImageContext } from 'context/ImageContext';

const ImageGallery = () => {
  const { images } = useContext(ImageContext);

     return (
      <div className={css.container}>
        {images.length > 0 ? (
          <ul className={css.imageGallery}>
            {images.map(el => (
              <ImageGalleryItem
                key={el.id}
                src={el.webformatURL}
                alt={el.tags}
                largeImageURL={el.largeImageURL}
              />
            ))}
          </ul>
        ) : (
          <div className={css.noImages}>No images found</div>
        )}
      </div>
    );
  }

export default ImageGallery;
