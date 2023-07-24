import css from './Modal.module.css';
import { Component } from 'react';
import Loader from 'components/Loader/Loader';
import PropTypes from 'prop-types';

class Modal extends Component {
  state = {
    isImageLoaded: false,
  };

  handleImageLoad = () => {
    this.setState({ isImageLoaded: true });
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.toggleModal();
    }
  };

  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { src, alt } = this.props;
    const { isImageLoaded } = this.state;
    return (
      <div>
        <div className={css.overlay} onClick={this.handleBackDropClick}>
          <div className={css.modal}>
            {!isImageLoaded && <Loader />}
            <img
              className={css.image}
              src={src}
              alt={alt}
              onLoad={this.handleImageLoad}
            />
            {/* <button
              className={css.closeButton}
              type="button"
              onClick={toggleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="15px"
                height="25px"
              >
                <path
                  d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
                  fill="#ffffff"
                />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  toggleModal: PropTypes.func,
};

export default Modal;
