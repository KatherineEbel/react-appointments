import React from 'react'
import { createContainer } from './domManipulators'
import { AppointmentForm } from '../src/AppointmentForm'

describe('AppointmentForm', function () {
  let render, container
  
  beforeEach(() => {
    ({render, container} = createContainer())
  })
  
  const form = id =>
    container.querySelector(`form[id="${id}"]`)
  const field = name =>
    form('appointment').elements[name]
  
  it('renders a form', function () {
    render(<AppointmentForm/>)
    expect(form('appointment')).not.toBeNull()
  })
  
  describe('service field', function () {
    it('renders a select box', function () {
      render(<AppointmentForm/>)
      expect(field('service')).not.toBeNull()
      expect(field('service').tagName).toEqual('SELECT')
    })
  })
})
