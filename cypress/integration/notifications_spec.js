describe("notifications", () => {
  it("should be able to access notifications", () => {
    //login user
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).click();
    cy.findByRole("button", { name: /sign in/i }).click();
  });

  it("should be able dissmis a notificaion", () => {
    //go to notifications page
    cy.get("[data-test= nav-top-notifications-link]").click();

    //verify content
    cy.contains(/dismiss/i)
      .click()
      .then(() => {
        cy.contains("Ibrahim Dickens liked a transaction").should("not.exist");
      });
  });
});
