import React, { useState } from 'react'
export const CustomerForm = ({ firstName, lastName, phoneNumber, onSubmit }) => {
  const [customer, setCustomer] = useState({ firstName, lastName, phoneNumber })
  function handleChange({ target }) {
    setCustomer({...customer, [target.name]: target.value })
  }
  return (
    <form
      id="customer"
      onSubmit={() => onSubmit(customer) }
    >
      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={ handleChange }
        type="text"
        value={firstName}
      />
      <label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        name="lastName"
        onChange={ handleChange }
        type="text"
        value={lastName}
      />
      <label htmlFor="phoneNumber">Phone number</label>
      <input
        id="phoneNumber"
        name="phoneNumber"
        onChange={ handleChange }
        type="text"
        value={ phoneNumber }
      />
      <input
        type="submit"
        value="Add"
      />
    </form>
  )
}
