import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ModalContainer, Overlay } from './Modal.styled';
import IconButton from '../Utils/IconButton/IconButton';
import PropTypes from 'prop-types';

const ModalRoot = document.querySelector('#modal-root');

const ModalWindow = ({ onClick, children }) => {
  const onEscapeKeydown = e => e.code === 'Escape' && onClick();
  const backgroundClick = e => e.currentTarget === e.target && onClick();

  useEffect(() => {
    window.addEventListener('keydown', onEscapeKeydown);
    return () => {
      window.removeEventListener('keydown', onEscapeKeydown);
    };
  }, []);

  return createPortal(
    <Overlay onClick={backgroundClick}>
      <ModalContainer>{children}</ModalContainer>
      <IconButton
        onClick={onClick}
        icon={<AiOutlineCloseCircle />}
        dataAction="close"
      />
    </Overlay>,
    ModalRoot
  );
};

export default ModalWindow;

ModalWindow.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};
