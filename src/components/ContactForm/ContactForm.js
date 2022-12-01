import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './ContactForm.module.css'

const ContactForm = (props) => {
  const [state, setState] = useState({
    name: '',
    number: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.onAddContact({ ...state })

    setState({ name: '', number: '' })
  }

  return (
    <form className={styles.TaskEditor} onSubmit={handleSubmit}>
      <label className={styles.TaskEditor_label}>
        Name
        <input
          className={styles.TaskEditor_input}
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <label className={styles.TaskEditor_label}>
        Number
        <input
          className={styles.TaskEditor_input}
          type="text"
          name="number"
          value={state.number}
          onChange={handleChange}
          autoComplete="off"
        />
      </label>
      <button className={styles.TaskEditor_button} type="submit">
        Add contact
      </button>
    </form>
  )
}
export default ContactForm

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
}
