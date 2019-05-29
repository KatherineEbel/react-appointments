import React, { useState } from 'react'

export const AppointmentForm = ({ onSubmit, selectedService, services }) => {
  const [service, setService] = useState(selectedService)
  return (
    <form
      id="appointment"
      onSubmit={() => onSubmit({ selectedService: service })}
    >
      <label htmlFor="service">Select a service</label>
      <select
        id="service"
        name="service"
        onChange={({ target }) => setService(target.value)}
        value={service}
      >
        <option/>
        {services.map(service => (
          <option key={service}>{service}</option>
        ))}
      </select>
    </form>
  )
}

AppointmentForm.defaultProps = {
  services: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ]
}
