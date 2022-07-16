import { v4 as uuidv4 } from 'uuid'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'
import ContactForm from './components/ContactForm/ContactForm'

const App = () => {
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // }

  const addContact = (task) => {
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

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts')
  //   const parsedContacts = JSON.parse(contacts)
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts })
  //   }
  // }
  // componentDidUpdate(prevProp, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  //   }
  // }

  // const getVisibleContacts = () => {
  //   const { contacts, filter } = this.state

  //   return contacts.filter((contacts) =>
  //     contacts.name.toLowerCase().includes(filter.toLowerCase()),
  //   )
  // }

  // removeContact = (contactId, prevState) => {
  //   this.setState((prevState) => {
  //     return {
  //       contacts: prevState.contacts.filter(({ id }) => id !== contactId),
  //     }
  //   })

  //   console.log(` persons removed`)
  // }
  const removeContact = (contactId) => {
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

  const filterUsers = (e) => {
    this.setState({
      filter: e.currentTarget.value,
    })
  }

  const visibleContacts = 1
  // getVisibleContacts()

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>

      <Filter input={filterUsers} />

      {visibleContacts.length > 0 && (
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </div>
  )
}
export default App
