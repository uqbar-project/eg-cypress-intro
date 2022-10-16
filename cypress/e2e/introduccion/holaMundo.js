/// <reference types="cypress" />

describe("Hola Mundo", () => {
  const saludo = "Hola Mundo"
  it("Vamos a ver si dice Hola Mundo", () => {
    expect(saludo === "Hola Mundo").to.equal(true)
  })
})

describe("Operaciones Basicas", () => {
  const suma = (num1, num2) => num1 + num2
  it("Vamos a ver si suma bien", () => {
    expect(suma(2, 3)).to.equal(5)
  })

  const resta = (num1, num2) => num1 - num2
  it("Vamos a ver si resta bien", () => {
    expect(resta(4, 3)).to.equal(1)
  })

  const multiplicacion = (num1, num2) => num1 * num2
  it("Vamos a ver si multiplica bien", () => {
    expect(multiplicacion(2, 3)).to.equal(6)
  })

  const division = (num1, num2) => num1 / num2
  it("Vamos a ver si divide bien", () => {
    expect(division(6, 3)).to.equal(2)
  })
})
