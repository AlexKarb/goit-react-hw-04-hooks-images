import { forwardRef } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import List from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = forwardRef(({ images, setActiveImage }, ref) => (
  <List>
    {images.map(img => (
      <ImageGalleryItem
        ref={ref}
        src={img.webformatURL}
        alt={img.tags}
        key={img.webformatURL}
        onClick={() => setActiveImage(img)}
      />
    ))}
  </List>
));

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
  setActiveImage: PropTypes.func.isRequired,
};
