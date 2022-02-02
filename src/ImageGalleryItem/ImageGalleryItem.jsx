import { forwardRef } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = forwardRef(({ src, alt, onClick }, ref) => (
  <Item onClick={onClick} ref={ref}>
    <Image src={src} alt={alt} />
  </Item>
));

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
