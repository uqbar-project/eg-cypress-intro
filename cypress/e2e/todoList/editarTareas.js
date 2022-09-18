/// <reference types="cypress" />
import { getByDataTestId } from "../utils"

describe('Editar Tarea - Test Suite', () => {
  describe('Cuando se intenta editar una tarea', () => {
    // Pantalla de lista de tareas
    const getInputDescripcionDeTarea = () => getByDataTestId('descripcionTarea')
    const getBotonAgregarTarea = () => getByDataTestId('agregarTarea')

    const crearNuevaTarea = () => {
      cy.visit('/')
      getInputDescripcionDeTarea().type('Nueva Tarea')
      getBotonAgregarTarea().click()
    }

    const editarNuevaTarea = () => {
      getByDataTestId('tableRowId').click()
    }
    // Pantalla de lista de tareas

    beforeEach(() => {
      crearNuevaTarea()
      editarNuevaTarea()
    })

    it('Si no se ingresa una descripcion y se intentan confirmar los cambios, el sistema arroja un error', () => {
      getByDataTestId('descripcionTarea').clear()
      getByDataTestId('aceptar').click()

      getByDataTestId('errorMessage')
    })


    it('Si no se ingresa una prioridad y se intentan confirmar los cambios, el sistema arroja un error', () => {
      getByDataTestId('prioridadTarea').select('Selecciona una opción')
      getByDataTestId('aceptar').click()

      getByDataTestId('errorMessage')
    })

    it('Si se modifica la descripcion y la prioridad pero se cancela la edicion, el sistema no altera la tarea', () => {
      getByDataTestId('descripcionTarea').clear()
      getByDataTestId('descripcionTarea').type('Nueva Descripcion')
      getByDataTestId('prioridadTarea').select('Alta');
      getByDataTestId('cancelar').click()

      cy.contains('[data-testid="tableRowDesc"]', 'Nueva Tarea')
    })

    it('Si se modifica la descripcion y la prioridad y se confirman los cambios, la tarea se actualiza', () => {
      getByDataTestId('descripcionTarea').clear()
      getByDataTestId('descripcionTarea').type('Nueva Descripcion')
      getByDataTestId('prioridadTarea').select('Alta');
      getByDataTestId('aceptar').click()

      cy.contains('[data-testid="tableRowDesc"]', 'Nueva Descripcion')
      cy.contains('[data-testid="tableRowPrioridad"]', 'Alta')
    })
  })
})
