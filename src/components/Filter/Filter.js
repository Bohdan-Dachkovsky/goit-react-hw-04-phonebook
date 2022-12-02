import React from 'react'
import PropTypes from 'prop-types'

export default function Filter({ input, filter }) {
  return (
    <div>
      Find contacts by name
      <input type="text" value={filter} onInput={input} placeholder="Search" />
    </div>
  )
}
Filter.propTypes = {
  input: PropTypes.func.isRequired,
}
