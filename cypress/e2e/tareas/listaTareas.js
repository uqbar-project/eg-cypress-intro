/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
import { getByDataTestId } from '../utils'
// import { slowCypressDown } from 'cypress-slow-down'

// para demorar la ejecución de cada comando de cypress un cierto tiempo
// no conviene utilizarlo si no tenemos demoras
// slowCypressDown(300)

describe('Lista de Tareas - Test Suite', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('En la página principal', () => {
    // - Este test es muy frágil,
    // - requiere levantar el backend
    // - Expuesto a cambios (el backend es una memoria compartida, cualquiera puede cambiar el dato)
    //
    // it('se puede traer una tarea', () => {
    //   getInputDescripcionDeTarea().type('Im')

    //   cy.contains('[data-testid="descripcion_0"]', 'Implementar single sign on desde la extranet')
    // })

    // - Segunda variante, hacemos un circuito feliz: creamos una tarea sin asignatario
    // - luego la asignamos y por último la cumplimos
    // - El test prueba más cosas, pero está menos acoplado a los datos existentes
    //
    // Desventajas
    // - Termino creando un montón de tareas (el test tiene efecto!)
    // - Una forma de resolverlo fue creando un endpoint DELETE para dejar todo como estaba
    // - Necesito un entorno de stage, o review app para no afectar producción
    // - Tuve que agregar wait, que es un antipattern para evitar tests flaky o que se rompan
    //   porque cuando utilizamos herramientas que tipean muy rápido los frameworks
    //   no llegan a actualizar
    // - El wait rompe el linter, tuve que desactivarlo arriba de todo

    it('se puede crear una tarea, asignarla y cumplirla', () => {
      const descripcionNuevaTarea = 'Correr tests e2e'
      const personaAsignada = 'Nahuel Palumbo'

      // Creamos una nueva tarea
      getByDataTestId('nueva-tarea').click()
      getByDataTestId('descripcion').type(descripcionNuevaTarea)
      getByDataTestId('iteracion').type('Iteración 1')
      getByDataTestId('fecha').type('10/02/2020')
      getByDataTestId('guardar').click()

      cy.wait(250)
      cy.get('tr').last().as('ultimaFila')
      cy.get('@ultimaFila').contains('td', descripcionNuevaTarea)

      // Asignamos la tarea
      cy.get('@ultimaFila').find('#asignarModal').click()
      getByDataTestId('asignatario').select(personaAsignada)
      getByDataTestId('guardar').click()

      getByDataTestId('tareaBuscada').type(descripcionNuevaTarea)
      cy.get('@ultimaFila').contains('td', personaAsignada)

      // Cumplimos la tarea
      cy.get('@ultimaFila').find('#cumplirTarea').click()
      cy.get('@ultimaFila').contains('td', '100,00')

      // Eliminamos la tarea
      cy.request(
        'delete',
        `http://localhost:9000/tareas/${descripcionNuevaTarea}`
      ).should((response) => expect(response.status).to.eq(200))
    })
  })
})
