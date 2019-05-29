import React, { useState } from 'react'

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':')
  return `${h}:${m}`
}
export const Appointment = ({ customer }) => (
  <div>
    <h4>{ `${customer.firstName} ${customer.lastName}`}</h4>
    <p>{ customer.phoneNumber }</p>
    <p>{ customer.stylist } for { customer.service }</p>
    <p>Please note: { customer.notes }</p>
  </div>
)
export const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0)
  
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map(({ startsAt }, idx) => (
          <li key={startsAt}>
            <button
              onClick={() => setSelectedAppointment(idx) }
              type="button"
            >
              {appointmentTimeOfDay(startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]}/>
      )}
    </div>
  )
}
