import {
  ContactList,
  ContactInfo,
  Contact,
  DeleteButton,
} from './Contacts.styled';
import { deleteContacts } from 'redux/operations';
import { selectedContacts, selectIsLoading } from 'redux/selectors';
import { useDispatch, useSelector } from 'react-redux';

export const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectedContacts);

  const deleteContact = id => {
    dispatch(deleteContacts(id));
  };

  return (
    <ContactList>
      {isLoading === false &&
        filteredContacts.map(({ id, name, phone }) => {
          return (
            <Contact key={id}>
              <ContactInfo>{name}</ContactInfo>
              <ContactInfo>{phone}</ContactInfo>
              <DeleteButton onClick={() => deleteContact(id)}>
                Delete
              </DeleteButton>
            </Contact>
          );
        })}
    </ContactList>
  );
};
