/// <reference types="cypress" />

export const getByDataTestId = (dataTestId) => cy.get(`[data-testid="${dataTestId}"]`)
