
import { faker } from '@faker-js/faker';

describe('accounts from user', ()=>{
  const bankName = faker.company.companyName()
  it('should let you create a new account', ()=> {

    cy.contains(/bank accounts/i).click();
    cy.findByText(/create/i).click();

    //fill information
    cy.findByPlaceholderText('Bank Name').clear().type(bankName)
    cy.findByPlaceholderText('Routing Number').clear().type(111111111)
    cy.findByPlaceholderText('Account Number').clear().type(123456789)
    cy.findByRole('button', {  name: /save/i}).click();

    //find new bank account
    cy.contains(bankName).then(($account)=>{
      expect($account.text).to.exist
    })
  })
})
