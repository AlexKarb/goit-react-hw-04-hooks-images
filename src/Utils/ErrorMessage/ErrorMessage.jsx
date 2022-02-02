import Message from './ErrorMessage.styled';
import PropTypes from 'prop-types';

const ErrorMessage = ({ text }) => <Message>{text}</Message>;

export { ErrorMessage };

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
