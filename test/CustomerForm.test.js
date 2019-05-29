import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'

describe('CustomerForm', function () {
  let render, container
  
  beforeEach(() => {
    ({ render, container } = createContainer())
  })
  
  const form = id => container.querySelector(`form[id="${id}"]`)
  const field = name =>
    form('customer').elements[ name ]
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`)
  
  it('renders a form', function () {
    render(<CustomerForm/>)
    expect(
      form('customer')
    ).not.toBeNull()
  })
  
  it('has a submit button', function () {
    render(<CustomerForm/>)
    const submitButton = container.querySelector(
      'input[type="submit"]'
    )
    expect(submitButton).not.toBeNull()
  })
  
  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull()
    expect(formElement.tagName).toEqual('INPUT')
    expect(formElement.type).toEqual('text')
  }
  
  const itRendersAsATextBox = (fieldName) =>
    it('renders as a text box', function () {
      render(<CustomerForm/>)
      expectToBeInputFieldOfTypeText(field(fieldName))
    })
  
  const itIncludesTheExistingValue = fieldName =>
    it('includes the existing value', function () {
      render(<CustomerForm {...{ [ fieldName ]: 'value' }} />)
      expect(field(fieldName).value).toEqual('value')
    })
  
  const itRendersALabel = (fieldName, labelText) =>
    it('renders a label', function () {
      render(<CustomerForm/>)
      expect(labelFor(fieldName)).not.toBeNull()
      expect(labelFor(fieldName).textContent).toEqual(labelText)
    })
  
  const itAssignsAnIdToMatchLabelId = fieldName =>
    it('assigns an id that matches the label id', function () {
      render(<CustomerForm/>)
      expect(field(fieldName).id).toEqual(fieldName)
    })
  
  const itSubmitsExistingValue = fieldName =>
    it('saves existing value when submitted', async function () {
      expect.hasAssertions()
      render(<CustomerForm
        {...{[fieldName]: 'value'} }
        onSubmit={props =>
          expect(props[fieldName]).toEqual('value')
        }
      />)
      
      await ReactTestUtils.Simulate.submit(form('customer'))
    })
  
  const itSubmitsNewValue = (fieldName, value) =>
    it('saves new value when submitted', async function () {
      expect.hasAssertions()
      render(
        <CustomerForm
          {...{[fieldName]: value}}
          onSubmit={props =>
            expect(props[fieldName]).toEqual(value)
          }
        />
      )
      await ReactTestUtils.Simulate.change(field(fieldName), {
        target: { value }
      })
      await ReactTestUtils.Simulate.submit(form('customer'))
    })
  
  describe('first name field', function () {
    const fieldName = 'firstName'
    const labelText = 'First name'
    const newValue = 'Jamie'
    itRendersAsATextBox(fieldName)
    itIncludesTheExistingValue(fieldName)
    itRendersALabel(fieldName, labelText)
    itAssignsAnIdToMatchLabelId(fieldName)
    itSubmitsExistingValue(fieldName)
    itSubmitsNewValue(fieldName, newValue)
  })
  
  describe('last name field', function () {
    const fieldName = 'lastName'
    const labelText = 'Last name'
    const newValue = 'Lanister'
    itRendersAsATextBox(fieldName)
    itIncludesTheExistingValue(fieldName)
    itRendersALabel(fieldName, labelText)
    itAssignsAnIdToMatchLabelId(fieldName)
    itSubmitsExistingValue(fieldName)
    itSubmitsNewValue(fieldName, newValue)
  })
  
  describe('phone number field', function () {
    const fieldName = 'phoneNumber'
    const labelText = 'Phone number'
    const newValue = '555-555-5555'
    itRendersAsATextBox(fieldName)
    itIncludesTheExistingValue(fieldName)
    itRendersALabel(fieldName, labelText)
    itAssignsAnIdToMatchLabelId(fieldName)
    itSubmitsExistingValue(fieldName)
    itSubmitsNewValue(fieldName, newValue)
  })
})
