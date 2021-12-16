//для работы с БД
const Pool = require("pg").Pool;

//подключение к бд и экспорт функции
module.exports.connect = async (login, password) => {
  const pool = new Pool({
    user: login,
    password: password,
    host: "localhost",
    port: 5432,
    database: "practice_db",
    application_name: "GUI",
  });

  return pool
};

// return pool.connect().then(
//   async (client) => {
//     return client;
//   },
//   async () => {
//     console.log("auth failled");
//   }
// );
