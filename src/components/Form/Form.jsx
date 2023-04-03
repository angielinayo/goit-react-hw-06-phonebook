import { useState } from 'react';
import { FilterStyled } from '../Filter/Filter.styled';

import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { addContacts } from 'redux/operations';
import { useDispatch } from 'react-redux';
import { selectContactsList } from 'redux/selectors';
import { useSelector } from 'react-redux/es/exports';

export const Form = () => {
  const dispatch = useDispatch();
  const contactsList = useSelector(selectContactsList);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateContacts({ name, number });
    resetForm();
  };

  const updateContacts = ({ name, number }) => {
    const contact = { id: nanoid(), name, phone: number };
    const contactExists = contactsList.find(contact => {
      return contact.name === name || contact.number === number;
    });

    contactExists
      ? Report.info(
          '',
          `Contact with name ${name} and number ${number} already exists`,
          'Okay'
        )
      : dispatch(addContacts(contact));
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <div>
      <FilterStyled onSubmit={handleSubmit}>
        <label>
          Name
          <input
            className="name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </FilterStyled>
    </div>
  );
};
