import React from 'react'
import PropTypes from 'prop-types'
import styles from './ContactList.module.css'

const ContactList = ({ contacts, onRemoveContact }) => {
  console.log(contacts)
  return (
    <ul className={styles.TaskList}>
      <li>
        {!contacts.length && <p>No data contacts!</p>}
        {contacts.length || <p>Find data contacts!</p>}
      </li>
      {contacts.map((contact, idx, arr) => (
        <li className={styles.TaskList_item} key={contact.id}>
          {contact.name + ':' + contact.number}
          {console.log(arr)}
          {
            <button
              className={styles.TaskList_button}
              type="button"
              name="delete"
              onClick={() => onRemoveContact(contact.id)}
            >
              Delete
            </button>
          }
        </li>
      ))}
    </ul>
  )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onRemoveContact: PropTypes.func.isRequired,
}
export default ContactList
