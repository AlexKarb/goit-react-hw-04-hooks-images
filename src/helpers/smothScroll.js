import PropTypes from 'prop-types';

// 1- ref of El (for heigth)
// 2 - dynamic page (for scroll)

const smoothScroll = (refEl, page) => {
  if (page !== 1) {
    window.scrollBy({
      top: refEl.clientHeight * 1.7,
      behavior: 'smooth',
    });
  }
};

export default smoothScroll;

smoothScroll.propTypes = {
  refEl: PropTypes.element.isRequired,
  page: PropTypes.number.isRequired,
};
