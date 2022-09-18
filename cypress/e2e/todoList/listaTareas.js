/// <reference types="cypress" />
import { getByDataTestId } from "../utils"

describe('Lista de Tareas - Test Suite', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const getInputDescripcionDeTarea = () => getByDataTestId('descripcionTarea')
  const getBotonAgregarTarea = () => getByDataTestId('agregarTarea')

  describe('Cuando se intenta agregar una tarea', () => {
    it('Si se ingresa una descripcion, el sistema lo agrega a la lista', () => {
      getInputDescripcionDeTarea().type('Nueva tarea')
      getBotonAgregarTarea().click()

      cy.contains('[data-testid="tableRowId"]', 1)
      cy.contains('[data-testid="tableRowDesc"]', 'Nueva tarea')
    })

    it('Si no se ingresa una descripcion, se muestra un mensaje de error', () => {
      getBotonAgregarTarea().click()

      getByDataTestId('errorMessage')
    })

    describe('Cuando se crea una tarea correctamente', () => {
      beforeEach(() => {
        // Crear tarea 1
        getInputDescripcionDeTarea().type('Tarea 1')
        getBotonAgregarTarea().click()
      })

      it('La tarea inicia por defecto con una prioridad media', () => {
        cy.contains('[data-testid="tableRowPrioridad"]', 'Media')
      });

      it('Si se hace click en una tarea, el sistema nos redirige a la pantalla de edicion de esa tarea', () => {
        getByDataTestId('tableRowId').click()
        cy.location('href').should('include', '/editarTarea/1')
      });
    })

    describe('Cuando se agregan dos tareas correctamente', () => {
      beforeEach(() => {
        // Crear tarea 1
        getInputDescripcionDeTarea().type('Tarea 1')
        getBotonAgregarTarea().click()

        //Crear tarea 2
        getInputDescripcionDeTarea().type('Tarea 2')
        getBotonAgregarTarea().click()
      })

      it('El ID aumenta de forma incremental', () => {
        getByDataTestId('tableRowId').each((item, index) => {
          cy.wrap(item).should('contain.text', (index + 1).toString())
        })
      })
    })

  })
})
