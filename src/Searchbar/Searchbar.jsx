import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { FcSearch } from 'react-icons/fc';
import { IconButton } from '../Utils/';
import {
  HeaderContainer,
  StyledForm,
  FormInput,
  TextError,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => (
  <HeaderContainer>
    <Formik
      initialValues={{ searchValue: '' }}
      validateOnBlur={false}
      validationSchema={Yup.object().shape({
        searchValue: Yup.string().min(2, 'Too Short!').required('Required'),
      })}
      onSubmit={({ searchValue }, { resetForm }) => {
        onSubmit(searchValue.split(' ').join('+'));
        resetForm();
      }}
    >
      <StyledForm>
        <IconButton type="submit " icon={<FcSearch />} dataAction="search" />
        <FormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchValue"
        />
        <ErrorMessage
          name="searchValue"
          render={message => <TextError>{message}</TextError>}
        />
      </StyledForm>
    </Formik>
  </HeaderContainer>
);

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
