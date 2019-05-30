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
  
  describe('time slot table', function () {
    const startsAtField = index =>
      container.querySelectorAll(`input[name="startsAt"]`)[index]
    
    const timeSlotTable = () =>
      container.querySelector('table#time-slots')
    
    it('renders a table for time slots', function () {
      render(<AppointmentForm/>)
      expect(
        timeSlotTable()
      ).not.toBeNull()
    })
  
    it('renders a time slot for every half hour between open and close times', function () {
      render(
        <AppointmentForm
          opensAt={9}
          closesAt={11}
        />
      )
      const timesOfDay = timeSlotTable().querySelectorAll('tbody >* th')
      expect(timesOfDay).toHaveLength(4)
      expect(timesOfDay[0].textContent).toEqual('09:00')
      expect(timesOfDay[1].textContent).toEqual('09:30')
      expect(timesOfDay[3].textContent).toEqual('10:30')
    })
  
    it('renders an empty cell at the start of the header row', function () {
      render(<AppointmentForm/>)
      const headerRow = timeSlotTable().querySelector('thead > tr')
      expect(headerRow.firstChild.textContent).toEqual('')
    })
  
    it('renders a week of available dates', function () {
      const today = new Date(2019, 4, 27)
      render(<AppointmentForm
        today={ today }
      />)
      const dates = timeSlotTable().querySelectorAll(
        'thead >* th:not(:first-child)'
      )
      expect(dates).toHaveLength(7)
      expect(dates[0].textContent).toEqual('Mon 27')
      expect(dates[1].textContent).toEqual('Tue 28')
      expect(dates[6].textContent).toEqual('Sun 02')
    })
  
    it('renders a radio button for each time slot', function () {
      const today = new Date()
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0)},
        { startsAt: today.setHours(9, 30, 0, 0)},
      ]
      render(
        <AppointmentForm
          availableTimeSlots={ availableTimeSlots }
          today={ today }
        />
      )
      const cells = timeSlotTable().querySelectorAll('td')
      expect(
        cells[0].querySelector('input[type="radio"]')
      ).not.toBeNull()
      expect(
        cells[7].querySelector('input[type="radio"]')
      ).not.toBeNull()
    })
  
    it('does not render radio buttons for unavailable time slots', function () {
      render(<AppointmentForm  availableTimeSlots={[]}/>)
      const timesOfDay = timeSlotTable().querySelectorAll('input')
      expect(timesOfDay).toHaveLength(0)
    })
  
    it('sets radio button values to the index of the corresponding appointment', function () {
      const today = new Date()
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0)},
        { startsAt: today.setHours(9, 30, 0, 0)},
      ]
      render(
        <AppointmentForm
          availableTimeSlots={availableTimeSlots }
          today={ today }
        />
      )
      expect(startsAtField(0).value).toEqual(
        availableTimeSlots[0].startsAt.toString()
      )
      expect(startsAtField(1).value).toEqual(
        availableTimeSlots[1].startsAt.toString()
      )
    })
  
    it('pre-selects an existing value', function () {
      expect.hasAssertions()
      const today = new Date()
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0)},
        { startsAt: today.setHours(9, 30, 0, 0)},
      ]
      render(
        <AppointmentForm
          availableTimeSlots={ availableTimeSlots }
          today={ today }
          startsAt={ availableTimeSlots[0].startsAt }
        />
      )
      expect(startsAtField(0).checked).toBe(true)
    })
  
    it('saves an existing value when submitted', function () {
      expect.hasAssertions()
      const today = new Date()
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0)},
        { startsAt: today.setHours(9, 30, 0, 0)},
      ]
      render(
        <AppointmentForm
          availableTimeSlots={ availableTimeSlots }
          today={ today }
          startsAt={ availableTimeSlots[0].startsAt }
          onSubmit={({ startsAt }) =>
            expect(startsAt).toEqual(availableTimeSlots[0].startsAt)
          }
        />
      )
      ReactTestUtils.Simulate.submit(form('appointment'))
    })
    it('saves a new value when submitted', async function() {
      expect.hasAssertions()
      const today = new Date()
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0)},
        { startsAt: today.setHours(9, 30, 0, 0)},
      ]
      render(
        <AppointmentForm
          availableTimeSlots={ availableTimeSlots }
          today={ today }
          startsAt={ availableTimeSlots[0].startsAt }
          onSubmit={({ startsAt }) =>
            expect(startsAt).toEqual(availableTimeSlots[1].startsAt)
          }
        />
      )
      ReactTestUtils.Simulate.change(startsAtField(1), {
        target: { value: availableTimeSlots[1].startsAt.toString()}
      })
    
      ReactTestUtils.Simulate.submit(form('appointment'))
    })
  })
  
})
