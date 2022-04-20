const { v4: uuidv4 } = require("uuid");
describe("notifications", () => {
  it("should be able dissmis a notificaion", () => {
    let notifyCount;
    //review previews notifications
    cy.contains(/notifications/i).click();

    cy.get('[data-test="notifications-list"]')
      .find("li")
      .then(($noty) => {
        notifyCount = $noty.length;
      });

    // creates a trackable payment
    cy.findByText(/new/i).click();
    cy.findByRole("textbox").type("devon becker");
    cy.findByText(/devon becker/i).click();
    const payment = "100.00";
    cy.findByPlaceholderText(/amount/i).type(payment);
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    cy.findByRole("button", { name: /return to transactions/i }).click();
    cy.findByText(/mine/i).click();
    cy.findByText(note).click({ force: true });

    //creates new notification
    cy.findByPlaceholderText(/write a comment.../i).type("asdf{enter}");
    cy.contains(/notifications/i).click();

    //review new notifications
    cy.get('[data-test="notifications-list"]')
      .find("li")
      .then(($nt) => {
        expect($nt.length).to.eq(notifyCount + 1);
      });

    //dismiss a notification
    cy.contains(/notifications/i)
      .click({force: true})
      .then(() => {
        cy.contains(/dismiss/i)
          .click({force: true})
          .then(() => {
            cy.get('[data-test="notifications-list"]')
              .find("li")
              .then(($nt) => {
                expect($nt.length).to.eq(notifyCount - 1);
              });
          });
      });
  });
});
