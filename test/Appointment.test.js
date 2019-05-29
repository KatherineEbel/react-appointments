import React from 'react'
import ReactDOM from 'react-dom'
import { Appointment } from '../src/Appointment'

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
})
