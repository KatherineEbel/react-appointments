import React from 'react'
import { createContainer } from './domManipulators'
import { CustomerForm } from '../src/CustomerForm'

describe('CustomerForm', function () {
  let render, container
  
  beforeEach(() => {
    ({ render, container } = createContainer())
  })
  
  const form = id => container.querySelector(`form[id="${id}"]`)
  const firstNameField = () => form('customer').elements.firstName
  
  it('renders a form', function () {
    render(<CustomerForm/>)
    expect(
      form('customer')
    ).not.toBeNull()
  })
  
  const expectToBeInputFieldOfTypeText = formElement => {
    expect(formElement).not.toBeNull()
    expect(formElement.tagName).toEqual('INPUT')
    expect(formElement.type).toEqual('text')
  }
  
  it('renders the first name field as a text box', function () {
    render(<CustomerForm/>)
    expectToBeInputFieldOfTypeText(firstNameField())
  })
  
  it('includes the existing value for the first name', function () {
    render(<CustomerForm firstName="Ashley" />)
    expect(firstNameField().value).toEqual('Ashley')
  })
  
  const labelFor = formElement =>
    container.querySelector(`label[for="${formElement}"]`)
  
  it('renders a label for the first name field', function () {
    render(<CustomerForm/>)
    expect(labelFor('firstName')).not.toBeNull()
    expect(labelFor('firstName').textContent).toEqual('First name')
  })
  
  it('assigns an id that matches the label id to the first name field', function () {
    render(<CustomerForm/>)
    expect(firstNameField().id).toEqual('firstName')
  })
})
