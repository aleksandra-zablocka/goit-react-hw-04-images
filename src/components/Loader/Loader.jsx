import css from './Loader.module.css';
import { Component } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
      <div className={css.containerStyle}>
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
}

export default Loader;
