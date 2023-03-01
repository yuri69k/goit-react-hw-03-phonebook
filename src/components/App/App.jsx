import { Component } from 'react';
import styles from './styles.module.css';
import { MdContactPhone } from 'react-icons/md';
import Form from '../Form';
import Contacts from '../Contacts';
import Filter from '../Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const fromStorage = JSON.parse(localStorage.getItem('contacts'));
    const parsedContacts = fromStorage?.length ? fromStorage : this.state.contacts;
    if (parsedContacts) this.setState({ contacts: [...parsedContacts] });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts.length!== contacts.length)
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }

  addContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  onFilterInput = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filteredContacts = () => {
    return [...this.state.contacts].filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLocaleLowerCase())
    );
  };
    handleRemoveContact = id =>    
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
      
    }));



  render() {
    return (
      <div className={styles.wrapper}>
        <h1>
          Phonebook <MdContactPhone
            size={35} className={styles.icon} />
        </h1>

        <Form addContact={this.addContact} contacts={this.state.contacts} />
        <h2>Contacts</h2>
        <Filter onInput={this.onFilterInput} />
        <Contacts        
          
          filteredContacts={this.filteredContacts}
          onRemove={this.handleRemoveContact}
        />
      </div>
    );
  }
}

export default App;
