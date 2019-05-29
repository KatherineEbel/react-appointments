import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-dom/test-utils'
import { Appointment, AppointmentsDayView } from '../src/AppointmentsDayView'

describe('Appointment', function () {
  let container, customer
  
  beforeEach(() => {
    container = document.createElement('div')
  })
  
  const render = component => ReactDOM.render(component, container)
  
  it('renders the customer first name', function () {
    customer = { firstName: 'Ashley' }
    render(<Appointment customer={ customer }/>)
    expect(container.textContent).toMatch('Ashley')
  })
  
  it('renders another customer first name', function () {
    customer = { firstName: 'Jordan' }
    render(<Appointment customer={ customer }/>)
    expect(container.textContent).toMatch('Jordan')
  })
  
  it('renders the customers last name', function () {
    const lastName = 'Smith'
    customer = { firstName: 'Jordan', lastName }
    render(<Appointment customer={ customer } />)
    expect(container.textContent).toMatch(lastName)
  })
  
  it('renders the customers phone number', function () {
    const phoneNumber = '555-555-5555'
    customer = { phoneNumber }
    render(<Appointment customer={ customer }/>)
    expect(container.textContent).toMatch(phoneNumber)
  })
  
  it('renders the stylists name', function () {
    const stylist = 'Becca'
    customer = { stylist }
    render(<Appointment customer={ customer }/>)
    expect(container.textContent).toMatch(stylist)
  })
  
  it('renders the salon service', function () {
    const service = 'Foils'
    customer = { service }
    render(<Appointment customer={ customer}/>)
    expect(container.textContent).toMatch(service)
  })
  
  it('renders the appointment notes', function () {
    const notes = 'Don\'t blow dry'
    customer = { notes }
    render(<Appointment customer={ customer }/>)
    expect(container.textContent).toMatch(notes)
  })
})

describe('AppointmentsDayView', function () {
  let container
  const today = new Date()
  const appointments = [
    { startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' }
    },
    { startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' }
    }
  ]
  
  beforeEach(() => {
    container = document.createElement('div')
  })
  
  const render = component =>
    ReactDOM.render(component, container)
  
  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]}/>)
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull()
  })
  
  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={ appointments }/>)
    expect(container.querySelector('ol')).not.toBeNull()
    expect(
      container.querySelector('ol').children
    ).toHaveLength(2)
  })
  
  it('renders each appointment in an li', function () {
    render(<AppointmentsDayView appointments={ appointments }/>)
    expect(container.querySelectorAll('li')).toHaveLength(2)
    expect(
      container.querySelectorAll('li')[0].textContent
    ).toEqual('12:00')
    expect(
      container.querySelectorAll('li')[1].textContent
    ).toEqual('13:00')
  })
  
  it('initially shows a message saying there are no appointments today', function () {
    render(<AppointmentsDayView appointments={[]}/>)
    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today'
    )
  })
  
  it('selects the first appointment by default', function () {
    render(<AppointmentsDayView appointments={ appointments }/>)
    expect(container.textContent).toMatch('Ashley')
  })
  
  it('has a button element in each li', function () {
    render(<AppointmentsDayView appointments={ appointments }/>)
    expect(
      container.querySelectorAll('li > button')
    ).toHaveLength(2)
    expect(
      container.querySelectorAll('li > button')[0].type
    ).toEqual('button')
  })
  
  it('renders another appointment when selected', function () {
    render(<AppointmentsDayView appointments={ appointments }/>)
    const button = container.querySelectorAll('button')[1]
    ReactTestUtils.Simulate.click(button)
    expect(container.textContent).toMatch('Jordan')
  })
})
