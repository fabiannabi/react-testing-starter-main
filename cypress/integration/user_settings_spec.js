
import { faker } from '@faker-js/faker';
describe("user setting interface", () => {
  it("should access yout user personal page and change user info ", () => {
    let originalName;
    let newFirstName;
    let newLastName;
    cy.contains(/my account/i).click();

    //find original name and input data
    cy.get('[data-test="sidenav-user-full-name"]').then(($name) => {
      originalName = $name.text();
    });
    cy.findByPlaceholderText(/First Name/i)
      .clear()
      .then(($empty) => {
        let name = faker.name.firstName()
        newFirstName = name
        cy.findByPlaceholderText(/First Name/i).type(name);
      });
    cy.findByPlaceholderText(/Last Name/i)
      .clear()
      .then(($empty) => {
        let name = faker.name.firstName()
        newLastName  = name
        cy.findByPlaceholderText(/Last Name/i).type(name);
      });
    cy.findByPlaceholderText(/Phone Number/i)
      .clear()
      .then(($empty) => {
        cy.findByPlaceholderText(/Phone Number/i).type(123123123);
      });
    cy.findByRole('button', {  name: /save/i}).click();

    //review changes
    cy.contains(/home/i).click();
    cy.get('[data-test="sidenav-user-full-name"]').then(($name) => {
      expect(`${newFirstName} ${newLastName[0]}`).to.eq($name.text())
    });
  });
});
