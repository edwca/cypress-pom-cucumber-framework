Feature: Login y Consulta General

  Scenario: Realizar login y consultar por RUT
    Given que ingreso al login
    When ingreso las credenciales correctamente
    Then navego al módulo Identificación General
    And consulto por rut en el iframe
