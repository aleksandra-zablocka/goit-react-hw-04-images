import css from './ImageGallery.module.css';
import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

class ImageGallery extends Component {
  render() {
    const { images } = this.props;

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
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      webformatURL: PropTypes.string,
      tags: PropTypes.string,
      largeImageURL: PropTypes.string,
    })
  ),
};

export default ImageGallery;
