Feature: Prueba de conexión a SQL Server
    @db
    Scenario: Validar conexión y consulta de base de datos
        Given que ingreso al login
        And me conecto a la base de datos
        Then visualizo las bases de datos disponibles
