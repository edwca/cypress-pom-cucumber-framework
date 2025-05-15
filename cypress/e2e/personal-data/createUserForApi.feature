Feature: Envio de formulario de cliente

  Scenario: Enviar formulario de cliente y verificar respuesta
    Given que me dirijo al portal total core
    When ingreso las credenciales validas
    And envío el formulario de cliente
    Then la respuesta del servidor debe ser exitosa
