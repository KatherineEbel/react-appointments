import React from 'react'

const appointmentTimeOfDay = startsAt => {
  const [h, m] = new Date(startsAt).toTimeString().split(':')
  return `${h}:${m}`
}
export const Appointment = ({ customer }) => <div>{ customer.firstName }</div>
export const AppointmentsDayView = ({ appointments }) => (
  <div id="appointmentsDayView">
    <ol>
        { appointments.map(({ startsAt }) => <li key={ startsAt }>{ appointmentTimeOfDay(startsAt) }</li>)}
    </ol>
    { appointments.length === 0 ? (
      <p>There are no appointments scheduled for today.</p>
    ) : (
      <Appointment { ...appointments[0] }/>
    )}
  </div>
)
