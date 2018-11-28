const SOURCE_PATH = 'src'
module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "123456789",
  "database": "blog",
  "entities": [SOURCE_PATH + "/entity/**.entity{.ts,.js}"],
  "synchronize": true
}