import React from 'react'
import { createContainer } from './domManipulators'
import { AppointmentForm } from '../src/AppointmentForm'
import ReactTestUtils from 'react-dom/test-utils'

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
    const findOption = (dropdownNode, textContent) => {
      const options = Array.from(dropdownNode.childNodes)
      return options.find(option => option.textContent === textContent)
    }
    
    it('renders a select box', function () {
      render(<AppointmentForm/>)
      expect(field('service')).not.toBeNull()
      expect(field('service').tagName).toEqual('SELECT')
    })
  
    it('initially has a blank value chosen', function () {
      render(<AppointmentForm/>)
      const firstNode = field('service').childNodes[0]
      expect(firstNode.value).toEqual('')
      expect(firstNode.selected).toBeTruthy()
    })
  
    it('lists all salon services', function () {
      const services = [
        'Cut',
        'Blow-dry',
      ]
      render(
        <AppointmentForm
          services={ services }
        />
      )
      
      const optionNodes = Array.from(
        field('service').childNodes
      )
      const renderedServices = optionNodes.map(
        node => node.textContent
      )
      expect(renderedServices).toEqual(
        expect.arrayContaining(services)
      )
    })
  
    it('pre-selects the existing value', function () {
      const services = ['Cut', 'Blow-dry']
      render(
        <AppointmentForm
          services={ services }
          selectedService="Blow-dry"
        />
      )
      
      const option = findOption(field('service'), 'Blow-dry')
      expect(option.selected).toBeTruthy()
    })
  
    it('renders a label', function () {
      render(<AppointmentForm/>)
      const label = container.querySelector('label[for="service"]')
      expect(label).not.toBeNull()
      expect(label.textContent).toBe('Select a service')
    })
  
    it('assigns an ID that matches the label id', function () {
      render(<AppointmentForm/>)
      expect(field('service').id).toBe('service')
    })
  
    it('submits the existing value', async function () {
      expect.hasAssertions()
      render(<AppointmentForm
        selectedService="Blow-dry"
        onSubmit={({ selectedService }) =>
          expect(selectedService).toEqual('Blow-dry')
        }
      />)
      await ReactTestUtils.Simulate.submit(form('appointment'))
    })
  
    it('submits a new value', async function () {
      expect.hasAssertions()
      render(<AppointmentForm
        selectedService="Blow-dry"
        onSubmit={({ selectedService }) =>
          expect(selectedService).toEqual('Cut')
        }
      />)
      
      await ReactTestUtils.Simulate.change(field('service'), {
        target: { value: 'Cut' }
      })
      await ReactTestUtils.Simulate.submit(form('appointment'))
    })
  })
})
