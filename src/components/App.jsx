import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { useState, useEffect, useRef } from 'react';

const API_KEY = '36802043-6369625f376675122720202cd';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputSearch, setInputSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);

  const prevPageRef = useRef(currentPage);

  useEffect(() => {
    if (inputSearch !== '') {
      fetchImages();
    }
  }, []);

  useEffect(() => {
    if (prevPageRef.current !== currentPage) {
      fetchImages();
    }
    prevPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    return () => {
      setImages([]);
      setIsSearchSubmitted(false);
    };
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&lang=eng&q=${inputSearch}&image_type=photo&orientation=horizontal&per_page=12&page=${currentPage}`
      );

      if (!response.ok) {
        throw new Error('Network response failed');
      }

      const data = await response.json();

      setImages(prevState => [...prevState, ...data.hits]);

      if (inputSearch !== '') {
        setIsSearchSubmitted(true);
      }
    } catch (error) {
      console.log('error', error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetchImages();
    setImages([]);
    setCurrentPage(1);
  };

  const handleChange = e => {
    const { value } = e.target;
    setInputSearch(value);

    if (isSearchSubmitted) {
      setIsSearchSubmitted(false);
      setImages([]);
    }
  };

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const isInputSearchEmpty = inputSearch === '';
  const hasImages = images.length > 0;
  return (
    <div>
      <Searchbar
        inputSearch={inputSearch}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />

      {isSearchSubmitted && !isInputSearchEmpty && (
        <>
          {isLoading && <Loader />}
          <ImageGallery images={images} />
          {hasImages && <Button loadMore={loadMore} />}
        </>
      )}
    </div>
  );
}

export default App;
