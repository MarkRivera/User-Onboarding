describe("Test our form inputs", function () {
    beforeEach(function () {
        cy.visit("http://localhost:3000");
    })

    it("add text to inputs", function() {
        cy.get('[data-cy=name]').type("Mark Rivera").should("have.value", "Mark Rivera");
        cy.get('[data-cy=email]').type("email@email.com").should("have.value", "email@email.com");
        cy.get('[data-cy=password]').type("123456").should("have.value", "123456");
        cy.get('[data-cy=tos]').check().should("be.checked");
        cy.get('[data-cy=sub-btn]').click();
    });
});