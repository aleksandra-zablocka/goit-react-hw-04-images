import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { useEffect, useRef, useContext } from 'react';
import { ImageContext } from 'context/ImageContext';

function App() {
  const {
    images,
    currentPage,
    inputSearch,
    isLoading,
    isSearchSubmitted,
    setImages,
    setIsSearchSubmitted,
    fetchImages,
    handleSubmit,
    handleChange,
    loadMore,
    isInputSearchEmpty,
    hasImages,
  } = useContext(ImageContext);

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
  }, [currentPage, fetchImages]);

  useEffect(() => {
    return () => {
      setImages([]);
      setIsSearchSubmitted(false);
    };
  }, [setImages, setIsSearchSubmitted]);

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
