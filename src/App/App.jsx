import { useState, useEffect } from 'react';
import api from '../service/image-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import ModalWindow from '../Modal/Modal';
import Loader from '../Utils/Loader/Loader';
import Button from '../Utils/Button/Button';
import ErrorMessage from '../Utils/ErrorMessage/ErrorMessage';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [searchRequest, setSearchRequest] = useState('');
  const [activeImage, setActiveImage] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const setResolvedRequest = ({ hits, total }) => {
    setImages(img => [...img, ...hits]);
    setTotal(total);
    setStatus('resolved');
    if (page !== 1) smoothScroll();
  };

  const setRejectedRequest = error => {
    setError(error);
    setStatus('rejected');
  };

  useEffect(() => {
    setStatus('loading');
    return api
      .getImages(searchRequest, page)
      .then(setResolvedRequest)
      .catch(setRejectedRequest);
  }, [page, searchRequest]);

  const smoothScroll = () =>
    window.scrollBy({
      top: 430,
      behavior: 'smooth',
    });

  const onSubmit = searchRequest => {
    setSearchRequest(searchRequest);
    setTotal(null);
    setPage(1);
    setImages([]);
  };

  const Success = status === 'resolved';
  const isLoading = status === 'loading';
  const Error = status === 'rejected';

  const endOfColection = Math.ceil(total / 12) === page;
  const imageIsFound = images.length > 0;
  const showButton = !endOfColection && imageIsFound && Success;

  return (
    <>
      <Searchbar onSubmit={onSubmit} />

      {imageIsFound && (
        <ImageGallery images={images} setActiveImage={setActiveImage} />
      )}

      {showButton && (
        <Button
          text="Load more"
          onClick={() => {
            setPage(page => page + 1);
          }}
        />
      )}

      {Error && <ErrorMessage text={error} />}

      {isLoading && <Loader />}

      {activeImage && (
        <ModalWindow onClick={() => setActiveImage(null)}>
          <img src={activeImage.largeImageURL} alt={activeImage.tags} />
        </ModalWindow>
      )}
    </>
  );
};

export default App;
