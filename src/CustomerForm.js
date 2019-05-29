import React from 'react'
export const CustomerForm = ({ firstName }) => (
  <form id="customer">
    <label htmlFor="firstName">First name</label>
    <input
      id="firstName"
      name="firstName"
      readOnly
      type="text"
      value={firstName }
    />
  </form>
)
