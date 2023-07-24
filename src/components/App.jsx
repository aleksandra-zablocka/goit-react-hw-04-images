import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { Component } from 'react';

const API_KEY = '36802043-6369625f376675122720202cd';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    inputSearch: '',
    isLoading: false,
    isSearchSubmitted: false,
  };

  async componentDidMount() {
    if (this.state.inputSearch !== '') {
      this.fetchImages();
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchImages();
    }
  }

  async componentWillUnmount() {
    this.setState({ images: [] });
    this.setState({ isSearchSubmitted: false });
  }

  fetchImages = async () => {
    const { inputSearch, currentPage } = this.state;
    this.setState({ isLoading: true });
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&lang=eng&q=${inputSearch}&image_type=photo&orientation=horizontal&per_page=12&page=${currentPage}`
      );

      if (!response.ok) {
        throw new Error('Network response failed');
      }

      const data = await response.json();

      this.setState(prevState => ({
        images: [...prevState.images, ...data.hits],
      }));

      if (inputSearch !== '') {
        this.setState({ isSearchSubmitted: true });
      }
    } catch (error) {
      console.log('error', error);
      return error;
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchImages();
    this.setState({ images: [], currentPage: 1 });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });

    if (this.state.isSearchSubmitted) {
      this.setState({ isSearchSubmitted: false, images: [] });
    }
  };

  loadMore = () => {
    // this.fetchImages();
    this.setState(prevState => ({
      ...prevState,
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { inputSearch, images, isLoading, isSearchSubmitted } = this.state;
    const isInputSearchEmpty = inputSearch === '';
    const hasImages = images.length > 0;
    return (
      <div>
        <Searchbar
          inputSearch={inputSearch}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />

        {isSearchSubmitted && !isInputSearchEmpty && (
          <>
            {isLoading && <Loader />}
            <ImageGallery images={images} />
            {hasImages && <Button loadMore={this.loadMore} />}
          </>
        )}
      </div>
    );
  }
}

export default App;
