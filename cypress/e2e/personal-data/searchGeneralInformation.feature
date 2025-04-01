Feature: Datos personales - Identificación General

  @IdentificacionGeneral
  Scenario Outline: US-00: Identificación general de usuario con rut valido e invalido
    Given que me dirijo al portal total core
    When ingreso las credenciales validas
    Then navego al módulo Identificación General
    And consulto por rut '<TYPE>' en identificación general
    And completo los campos solicitados '<BIRTHDATE>' '<ACTIVITY>' <LOAD> '<EDUCATION>' '<PROFESSION>' '<SERIERUT>' '<CEDULA_EXP>' '<GENDER>' '<CLIENT_ORIGIN>' '<OFFICE>' '<NATIONALITY>' '<MARITAl_STATUS>' '<INCOME>' '<STUDENT>' '<COMMERCIAL_RELATIONSHIP>'

    # Then se muestra por pantalla el registro de usuario correcto


    Examples:
      | TEST  | TYPE  | BIRTHDATE  | ACTIVITY   | LOAD | EDUCATION       | PROFESSION                 | SERIERUT | CEDULA_EXP | GENDER    | CLIENT_ORIGIN           | OFFICE          | NATIONALITY | MARITAl_STATUS | INCOME               | STUDENT | COMMERCIAL_RELATIONSHIP       |
      | US:00 | VALID | 09/04/2025 | Agricultor | 1    | Básica Completa | Abogacía / Derecho / Leyes | sdsd     | 09/04/2030 | Masculino | Acercamiento a sucursal | 1 - CASA MATRIZ | CHILENA     | SOLTERO        | Empleado dependiente | NO      | CRÉDITOS PARA FINES GENERALES |
# | US:01 | INVALID |

