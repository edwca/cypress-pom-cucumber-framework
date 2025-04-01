Feature: Login app total core

  @IdentificacionGeneral
  Scenario Outline: US-00 / US-01 - Login credenciales validas e invalidas
    Given que me dirijo al portal total core
    When ingreso las credenciales validas
    # Then sistema debe mostrar el mensaje

    # Examples:
    #   | credenciales | mensaje esperado |
    #   | validas      | Bienvenido       |
    #   | invalidas    | Credenciales incorrectas |