describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    //   cy.visit('http://localhost:3000/')
    cy.visit("http://cribskgl.vercel.app/");

    // Find a link with an href attribute containing "Terms of Service" and click it
    //   cy.get('a[href*="terms-of-service"]').click()
    // cy.contains('Start Here!')
    // The new page should contain an h1 with "Start Here!"
    cy.get("h1").contains("Start Here!");
    // cy.contains('Terms of Service').click()
    cy.get('a[href*="terms-of-service"]').click();

    // The new url should include "/terms-of-service"
    cy.url().should("include", "/terms-of-service");

    // Find a link with an href attribute containing "Privacy" and click it
    cy.get('a[href*="privacy"]').click();

    // The new url should include "/privacy"
    cy.url().should("include", "/privacy");

    // Find a link with an href attribute containing "Site-map" and click it
    cy.get('a[href*="site-map"]').click();

    // The new url should include "/site-map"
    cy.url().should("include", "/site-map");
  });
});
