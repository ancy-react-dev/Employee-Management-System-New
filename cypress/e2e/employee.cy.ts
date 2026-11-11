
describe("Employee Management System", () => {

  it("should open the application successfully", () => {
    cy.visit("http://localhost:5173");
    cy.get("body").should("be.visible");
  });

  it("should open Signup page", () => {
    cy.visit("http://localhost:5173/signup");
    cy.get("body").should("be.visible");
  });

  it("should open Employee List page", () => {
    cy.visit("http://localhost:5173/employees");
    cy.get("body").should("be.visible");
    cy.url().should("include", "/employees");
  });

  it("should open Add Employee page", () => {
    cy.visit("http://localhost:5173/employees/add");
    cy.get("body").should("be.visible");
    cy.url().should("include", "/employees/add");
  });

  it("should open Login page", () => {
    cy.visit("http://localhost:5173/login");
    cy.get("body").should("be.visible");
    cy.url().should("include", "/login");
  });

  it("should show validation error for empty employee form", () => {
    cy.visit("http://localhost:5173/employees/add");
    cy.get("form").should("be.visible");
    cy.get('form button[type="submit"]').click();
    cy.contains("Please fill in all required fields.")
      .should("be.visible");
  });

  it("should show error for invalid email", () => {
    cy.visit("http://localhost:5173/employees/add");
    cy.get('input[name="name"]').type("Ancy");
    cy.get('input[name="email"]').type("ancy123");
    cy.get('select[name="department"]').select("IT");
    cy.get('input[name="designation"]').type("Developer");
    cy.get('input[name="joiningDate"]').type("2026-11-10");
    cy.get('form button[type="submit"]').click();
    cy.contains("Please enter a valid email address.")
      .should("be.visible");
  });

  it("should add a new employee successfully", () => {
    cy.visit("http://localhost:5173/employees/add");
    cy.get('input[name="name"]').type("Test Employee");
    cy.get('input[name="email"]').type("testemployee@example.com");
    cy.get('select[name="department"]').select("IT");
    cy.get('input[name="designation"]').type("Developer");
    cy.get('input[name="joiningDate"]').type("2026-11-10");
    cy.get('form button[type="submit"]').click();
    cy.contains("Employee added successfully!")
      .should("be.visible");
  });

  it("should display the Employee List page", () => {
    cy.visit("http://localhost:5173/employees");
    cy.get("body").should("be.visible");
    cy.url().should("include", "/employees");
  });

});
