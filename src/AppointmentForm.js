import React, { useCallback, useState } from 'react'

const timeIncrements = (numTimes, startTime, increment) =>
  Array(numTimes)
    .fill([ startTime ])
    .reduce((acc, _, i) => acc.concat([ startTime + (i * increment) ]))

const dailyTimeSlots = (opensAt, closesAt) => {
  const totalSlots = (closesAt - opensAt) * 2
  const startTime = new Date().setHours(opensAt, 0, 0, 0)
  const increment = 30 * 60 * 1000
  return timeIncrements(totalSlots, startTime, increment)
}

const weeklyDateValues = startDate => {
  const midnight = new Date(startDate).setHours(0, 0, 0, 0)
  const increment = 24 * 60 * 60 * 1000
  return timeIncrements(7, midnight, increment)
}


const toTimeValue = timestamp => new Date(timestamp).toTimeString().substring(0, 5)
const toShortDate = timestamp => {
  const [ day, , dayOfMoth ] = new Date(timestamp)
    .toDateString()
    .split(' ')
  return `${day} ${dayOfMoth}`
}

const mergeDateAndTime = (date, timeSlot) => {
  const time = new Date(timeSlot)
  return new Date(date).setHours(
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
    time.getMilliseconds()
  )
}

const RadioButtonIfAvailable = ({
                                  availableTimeSlots, date, handleChange, checkedTimeSlot, timeSlot
                                }) => {
  const startsAt = mergeDateAndTime(date, timeSlot)
  const isChecked = startsAt === checkedTimeSlot
  const isAvailable = availableTimeSlots.some(slot => slot.startsAt === startsAt)
  return isAvailable && (
    <input
      checked={isChecked}
      name="startsAt"
      onChange={handleChange}
      type="radio"
      value={startsAt}
    />)
}

const TimeSlotTable = ({ availableTimeSlots, checkedTimeSlot, opensAt, closesAt, handleChange, today }) => {
  const timeSlots = dailyTimeSlots(opensAt, closesAt)
  const dates = weeklyDateValues(today)
  return (
    <table id="time-slots">
      <thead>
      <tr>
        <th/>
        {dates.map(d => (
          <th key={d}>{toShortDate(d)}</th>
        ))}
      </tr>
      </thead>
      <tbody>
      {timeSlots.map(timeSlot => (
        <tr key={timeSlot}>
          <th>{toTimeValue(timeSlot)}</th>
          {dates.map(d => (
            <td key={d}>
              <RadioButtonIfAvailable
                availableTimeSlots={availableTimeSlots}
                date={d}
                handleChange={handleChange}
                checkedTimeSlot={ checkedTimeSlot }
                timeSlot={ timeSlot }
              />
            </td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export const AppointmentForm = ({
  availableTimeSlots,
  onSubmit,
  opensAt,
  closesAt,
  selectedService,
  startsAt,
  services,
  today
}) => {
  const [ service, setService ] = useState(selectedService)
  const [ startTime, setStartTime ] = useState(startsAt)
  
  const handleStartsAtChange = useCallback(({ target: { value } }) =>
    setStartTime(parseInt(value)), []
  )
  return (
    <form
      id="appointment"
      onSubmit={() => onSubmit({ selectedService: service, startsAt: startTime })}
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
      <TimeSlotTable
        availableTimeSlots={availableTimeSlots}
        handleChange={handleStartsAtChange}
        checkedTimeSlot={ startTime }
        closesAt={closesAt}
        opensAt={opensAt}
        today={today}
      />
      <input type="submit" value="Make Appointment"/>
    </form>
  )
}

AppointmentForm.defaultProps = {
  availableTimeSlots: [],
  opensAt: 9,
  closesAt: 19,
  services: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions'
  ],
  today: new Date()
}
