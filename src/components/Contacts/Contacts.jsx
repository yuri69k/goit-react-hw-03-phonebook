import PropTypes from 'prop-types';
import styles from './styles.module.css';
import { TiUserDeleteOutline } from 'react-icons/ti';
const Contacts = ({ contacts, filter, filteredContacts,onRemove }) => {
  let rendered = filter === '' ? contacts : filteredContacts();
  return (
    <ul className={styles.contactsList}>
      {rendered.map(({ name, id, number }) => (
        <li className={styles.listItem} key={id} id={id}>
          <span className={styles.contactName}>{name}: </span>
          <span className={styles.phoneNumber}>{number}</span>

          <button
            className={styles.buttons}
            onClick={()=> onRemove(id)}
            aria-label="delete contact button"
          >
            <TiUserDeleteOutline size={20} />
          </button>
        </li>
      ))}
    </ul>
  );
};

Contacts.propTypes = {
  filter: PropTypes.string,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  filteredContacts: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Contacts;