Feature: Registro nuevo cliente en Datos personales - Identificación General - Persona Natural

  Background: Validation data in database

  @IdentificacionGeneral @skip
  Scenario Outline: US-00: Identificación general de usuario particular con rut valido e invalido, fecha de nacimiento menor a la actual,con un numero mayor a 9 digitos
    Given que me dirijo al portal total core
    And ingreso las credenciales validas
    When navego al módulo Identificación General
    And consulto por un nuevo rut '<TYPE>' en modulo identificación general

    And completo la primera parte de los campos solicitados
      | BIRTHDATE  | ACTIVITY   | LOAD | EDUCATION       | PROFESSION                 | SERIERUT | CEDULA_EXP | GENDER    |
      | 09/04/1980 | Agricultor | 1    | Básica Completa | Abogacía / Derecho / Leyes | sdsd     | 09/04/2030 | Masculino |

    And completo la segunda parte de los campos solicitados
      | CLIENT_ORIGIN           | OFFICE          | NATIONALITY | MARITAl_STATUS | INCOME               | STUDENT | COMMERCIAL_RELATIONSHIP       | LEGAL_AP | RETIRED_PERSON |
      | Acercamiento a sucursal | 1 - CASA MATRIZ | CHILENA     | SOLTERO        | Empleado dependiente | SI      | CRÉDITOS PARA FINES GENERALES | SI       | SI             |

    And presiono el botón "GUARDAR CAMBIOS"
    Then me dirijo a la seccion "DIRECCIONES" para completar el detalle de lo que se solicita
    # And completo los datos solicitados en la sección "DIRECCIONES"
    #   | TYPE_OF_ADDRESS | REGION             | STREET_TYPE | PLACE       | PROVINCE | SITUATION | TYPE_OF_HOUSING | MUNICIPALITY | SECTOR |
    #   | Comercial       | 13 - Metropolitana | Avenida     | CONDOMINIUM | Santiago | Propia    | Casa            | Santiago     | Urbano |



    Examples:
      | TEST  | TYPE    |
      | US:00 | VALID |
      # | US:01 | INVALID |