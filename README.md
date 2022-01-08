## Correr migaciones
Tener instalado knex globalmente solo para esta parte

* Crear una migración nueva
    > knex --cwd src migrate:make tableName --env development
* Crear un seed
    > knex --cwd src seed:make nameSeed --env development
* correr migraciones (cuando corras migraciones, settea las variables directamente, porque no reconocera las variables de entorno)
    > knex --cwd src migrate:latest --env development
* correr seeds
    > knex --cwd src seed:run --env development