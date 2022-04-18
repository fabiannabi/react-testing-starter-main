import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TransactionCreateStepTwo from './TransactionCreateStepTwo'

//first render the compoenet we are testing
// pass props as normal react components

// screen.debug() <=> console.log
// screen.getByRole brings all the sections by role on the hml



//this will cause trouble cause for a second in initial render the button loads as enabled
//so will convert this into async function

// test('On initial render the pay button is disabled', () => {
//   render(<TransactionCreateStepTwo sender={{id:'1'}} receiver={{id:'1'}}/>);

//   expect(screen.getByRole('button', {name:/pay/i})).toBeEnabled()
// })



test('On initial render the pay button is disabled', async () => {
  render(<TransactionCreateStepTwo sender={{id:'1'}} receiver={{id:'1'}}/>);

  expect( await screen.findByRole('button', {name:/pay/i})).toBeDisabled()
})


//following the documentation if testing inputs, getByRole should not be your selector
//Instead getByLabelText or getByPlaceHolderText

//to mimic the user interaction use the userEvent method that comes with the test library
test('if amount and note is entered the pay button becomes enabled', async () => {
  render(<TransactionCreateStepTwo sender={{id:'1'}} receiver={{id:'1'}}/>);

  userEvent.type(screen.getByPlaceholderText(/amount/i), '100')
  userEvent.type(screen.getByPlaceholderText(/add a note/i), 'dinner')

  expect( await screen.findByRole('button', {name:/pay/i})).toBeEnabled()
})
