const { defineConfig } = require('cypress')

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:4200/',
    // estamos filtrando los ejemplos que trae Cypress
    excludeSpecPattern: '**/examples/**',
    specPattern: 'cypress/e2e/**',
  },
})
