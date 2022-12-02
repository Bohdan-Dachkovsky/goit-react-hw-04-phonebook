import { v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import ContactList from './components/ContactList/ContactList'
import Filter from './components/Filter/Filter'
import ContactForm from './components/ContactForm/ContactForm'
const initalContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]
const App = () => {
  const [contacts, setContacts] = useState(initalContacts)
  const [filter, setFilter] = useState('')

  const addContact = (phone) => {
    const searchSameName = contacts.map((cont) => {
      return cont.name === phone.name
    })
    if (searchSameName) {
      alert(`${phone.name} is already in contacts`)
    } else if (phone.name.length === 0) {
      alert('Fields must be filled!')
    } else {
      const contact = {
        ...phone,
        id: uuidv4(),
      }

      setContacts((contacts) => ({
        contacts: [...contacts, contact],
      }))
      console.log(` new persons added`)
    }

    if (phone.name.length === 0) {
      alert('Fields must be filled!')
    }
  }
  useEffect(() => {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)
    if (parsedContacts) {
      setContacts({ contacts: parsedContacts })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])
  const getVisibleContacts = () => {
    return !filter
      ? contacts
      : contacts.filter((contacts) =>
          contacts.name.toLowerCase().includes(filter.toLowerCase()),
        )
  }

  const removeContact = (contactId) => {
    setContacts((contacts) => contacts.filter((e) => e.id !== contactId))
  }

  const filterUsers = (e) => {
    setFilter(e.currentTarget.value)
  }

  const visibleContacts = getVisibleContacts()

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>

      <Filter input={filterUsers} filterValue={filter} />

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
