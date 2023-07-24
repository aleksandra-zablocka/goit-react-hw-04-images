import css from './ImageGalleryItem.module.css';
import { Component } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';

class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
    isImageLoaded: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  handleImageLoad = () => {
    this.setState({ isImageLoaded: true });
  };

  render() {
    const { src, alt, largeImageURL } = this.props;
    const { isImageLoaded } = this.state;

    return (
      <li className={css.imageGalleryItem}>
         {!isImageLoaded && <Loader />}
        <img
          className={css.imageGalleryItemImage}
          src={src}
          alt={alt}
          onClick={this.toggleModal}
          onLoad={this.handleImageLoad}
        />
        {this.state.isModalOpen && (
          <Modal src={largeImageURL} alt={alt} toggleModal={this.toggleModal} />
        )}
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;
