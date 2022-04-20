const {v4: uuidv4} = require('uuid')
describe('payment', () => {
  it('user can make payment', () => {

    //check account balance
    let oldBalance
    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => oldBalance = $balance.text())

    //click new buttons
    cy.findByText(/new/i).click();

    //look for user
    cy.findByRole('textbox').type('devon becker');
    cy.findByText(/devon becker/i).click();

    //enter amounnt and notes
    const payment = '100.00'
    cy.findByPlaceholderText(/amount/i).type(payment)
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note)


    //click pay
    cy.findByRole('button', {  name: /pay/i}).click();

    //return to transactions
    cy.findByRole('button', {  name: /return to transactions/i}).click();

    //go to personal payents
    cy.findByText(/mine/i).click();

    //click on payment
    cy.findByText(note).click({force:true});

    //verify if payment was marked
    cy.findByText(`-$${payment}`).should('be.visible')
    cy.findByText(note).should('be.visible')

    //verify amount is correct

    cy.get('[data-test="sidenav-user-balance"]').then(($balance) => {
      const oldAmount =  parseFloat(oldBalance.replace(/\$|,/g, ""));
      const TransactionBalance = parseFloat($balance.text().replace(/\$|,/g, ""));
      expect(oldAmount -TransactionBalance ).to.eq(parseFloat(payment))
    })
  })
})
