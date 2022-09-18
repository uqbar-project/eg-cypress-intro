/// <reference types="cypress" />
import { getByDataTestId } from "../utils"

describe('Lista de Tareas - Test Suite', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const getInputDescripcionDeTarea = () => getByDataTestId('tareaBuscada')

  describe('Cuando se busca una tarea por descripción', () => {
    it('El sistema lo trae correctamente', () => {
      getInputDescripcionDeTarea().type('Im')

      // Es muy frágil
      // 1- El backend tiene que estar levantado
      // 2- Expuesto a cambios (el backend es una memoria compartida, cualquiera puede cambiar el dato)
      //
      // Otra variante: utilizar Wiremock
      cy.contains('[data-testid="descripcion_0"]', 'Implementar single sign on desde la extranet')
    })
  })
})
