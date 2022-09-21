/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types="cypress" />
import { getByDataTestId } from "../utils"

describe('Lista de Tareas - Test Suite', () => {

  // Ejecuta antes de todos los tests
  before(() => {
    cy.visit('/')
  })

  beforeEach(() => {
    cy.visit('/')
  })

  const getInputDescripcionDeTarea = () => getByDataTestId('tareaBuscada')
  
  const crearTarea = (descripcion) => {
    getByDataTestId('nueva-tarea').click()
    getByDataTestId('descripcion').type(descripcion)
    getByDataTestId('iteracion').type('Iteración 1')
    // probar qué pasa con
    // getByDataTestId('porcentajeCumplimiento').type('0')
    getByDataTestId('porcentaje-cumplimiento').type('0')
    // TODO: no tiene efecto
    // getByDataTestId('asignatario').type('Nahuel Palumbo')
    getByDataTestId('fecha').type('10/02/2020')
    getByDataTestId('guardar').click()
  }

  const asignarTareaA = (descripcion, persona) => {
    cy.get('tr').last().find('#asignarModal').click()
    
    // Debemos estar seguros de que existe el usuario que nos pasaron como parámetro
    getByDataTestId('asignatario').select(persona)
    getByDataTestId('guardar').click()

  }

  const cumplirTarea = (descripcion) => {
    cy.get('tr').last().find('#cumplirTarea').click()
  }

  describe('En la página principal', () => {
    // - Este test es muy frágil,
    // - requiere levantar el backend
    // - Expuesto a cambios (el backend es una memoria compartida, cualquiera puede cambiar el dato)
    //
    it('se puede traer una tarea', () => {
      getInputDescripcionDeTarea().type('Im')
      
      cy.contains('[data-testid="descripcion_0"]', 'Implementar single sign on desde la extranet')
    })
    
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
      const descripcion = 'Correr tests e2e'

      crearTarea(descripcion)
      // Hay que esperar!! para poder ver reflejado, no anda de otra manera
      cy.wait(200)
      //
      cy.get('tr').last().contains('td', descripcion)

      asignarTareaA(descripcion, "Nahuel Palumbo")
      // un workaround al wait es forzar la recarga de la url
      // pero eso ocurre automáticamente
      // cy.visit('/')
      cy.wait(200)
      getInputDescripcionDeTarea().type('Corr')
      cy.get('tr').last().contains('td', 'Nahuel Palumbo')

      cumplirTarea(descripcion)
      cy.wait(200)
      cy.get('tr').last().contains('td', '100,00')
    })

    // Otra variante: utilizar Wiremock
  })
})
