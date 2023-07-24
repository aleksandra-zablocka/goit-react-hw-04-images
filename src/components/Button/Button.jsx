import css from './Button.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.loadMore();
  };

  render() {
    return (
      <div className={css.loadMore}>
        <button className={css.button} onClick={this.handleClick} type="button">
          Load more
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  loadMore: PropTypes.func,
};

export default Button;
