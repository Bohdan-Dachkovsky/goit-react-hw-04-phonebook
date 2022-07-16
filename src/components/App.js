import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ContactList from './ContactList/ContactList'
import Filter from './Filter/Filter'
import ContactForm from './ContactForm/ContactForm'

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }

  addContact = (task) => {
    const searchSameName = this.state.contacts
      .map((cont) => cont.name)
      .includes(task.name)
    if (searchSameName) {
      alert(`${task.name} is already in contacts`)
    } else if (task.name.length === 0) {
      alert('Fields must be filled!')
    } else {
      const contact = {
        ...task,
        id: uuidv4(),
      }

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }))
      console.log(` new persons added`)
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
  }
  componentDidUpdate(prevProp, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  getVisibleContacts = () => {
    const { contacts, filter } = this.state

    return contacts.filter((contacts) =>
      contacts.name.toLowerCase().includes(filter.toLowerCase()),
    )
  }

  // removeContact = (contactId, prevState) => {
  //   this.setState((prevState) => {
  //     return {
  //       contacts: prevState.contacts.filter(({ id }) => id !== contactId),
  //     }
  //   })

  //   console.log(` persons removed`)
  // }
  removeContact = (contactId) => {
    this.setState(({ contacts }) => {
      return {
        contacts: contacts.filter((e) => e.id !== contactId),
      }
    })
  }
  // handleChange = ({ target }) => {
  //   const { name, value } = target
  //   this.setState({ [name]: value })
  // }
  // changeFilter = ({ target }) => {
  //   this.setState({
  //     filter: target.value,
  //   })
  // }

  filterUsers(e) {
    this.setState({
      filter: e.currentTarget.value,
    })
  }

  render() {
    const visibleContacts = this.getVisibleContacts()

    return (
      <div>
        <h1>Phonebook</h1>

        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>

        <Filter input={this.filterUsers.bind(this)} />

        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    )
  }
}
