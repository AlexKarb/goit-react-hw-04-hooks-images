import { useState, useEffect, useRef } from 'react';
import { Button, ErrorMessage, Loader } from '../Utils';
import api from '../service/image-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import ModalWindow from '../Modal/Modal';
import smoothScroll from 'helpers/smothScroll';

const App = () => {
  const [images, setImages] = useState([]);
  const [dataRequest, setDataRequest] = useState({ request: '', page: 1 });
  const [activeImage, setActiveImage] = useState(null);
  const [status, setStatus] = useState('idle');
  //
  const cardEl = useRef(null);

  const setResolvedRequest = arrayOfImg => {
    setImages(img => [...img, ...arrayOfImg]);
    setStatus('resolved');
  };

  const setRejectedRequest = error =>
    setStatus({ status: 'rejected', message: error });

  useEffect(() => {
    if (dataRequest.request === '') {
      return;
    }

    setStatus('loading');
    api
      .getImages(dataRequest)
      .then(setResolvedRequest)
      .catch(setRejectedRequest)
      .finally(() => smoothScroll(cardEl.current, dataRequest.page));
  }, [dataRequest]);

  const onSubmit = searchRequest => {
    setDataRequest({ request: searchRequest, page: 1 });
    setImages([]);
  };

  const Success = status === 'resolved';
  const isLoading = status === 'loading';
  const Error = status.status === 'rejected';

  const endOfColection = images.length % 12 !== 0;
  const imageIsFound = images.length > 0;
  const showButton = !endOfColection && imageIsFound && Success;

  return (
    <>
      <Searchbar onSubmit={onSubmit} />

      {imageIsFound && (
        <ImageGallery
          images={images}
          ref={cardEl}
          setActiveImage={setActiveImage}
        />
      )}

      {showButton && (
        <Button
          text="Load more"
          onClick={() => {
            setDataRequest(state => ({ ...state, page: state.page + 1 }));
          }}
        />
      )}

      {Error && <ErrorMessage text={status.message} />}

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
