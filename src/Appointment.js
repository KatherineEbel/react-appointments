import React, { useState } from 'react'

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':')
  return `${h}:${m}`
}
export const Appointment = ({ customer }) => <div>{ customer.firstName }</div>
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
