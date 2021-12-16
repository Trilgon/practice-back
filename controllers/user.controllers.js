const { connect } = require("../data_base");
const crypto = require("crypto");
// export async function userAuth(req, res) {
//   let user = await connect(req.body.login, req.body.pas);
//   let client = { employee: user, empStatus: "" };
//   client.empStatus = await client.employee.query(
//     `SELECT emp_position FROM employee WHERE login=$1`,
//     [client.employee.options.user]
//   );
//   res.json(client.empStatus.rows[0]);
// }
let userController = {
  // commons: {login: ''},
  // managers: {login: ''},
  // admins: {login: ''},

  // async saveUsers(client) {

  //   if (client.empStatus.rows[0].emp_position == "common") {
  //     userController.commons.login = client.employee.options.user;
  //     userController.commons.user = client.employee;
  //   } else if (client.empStatus.rows[0].emp_position == "manager") {
  //     userController.managers.login = client.employee
  //     userController.managers.user = client.employee;
  //   } else if (client.empStatus.rows[0].emp_position == "admin") {
  //     userController.admins.login = client.employee
  //     userController.admins.user = client.employee;
  //   }
  // },
  // current: undefined,

  // async saveUser(client) {
  //     userController.current= client.employee;
  // },

  users: [],

  async saveUsers(client) {
    userController.users.push({
      login: client.employee.options.user,
      emp: client.employee,
      pos: client.empStatus.rows[0].emp_position,
    });
  },

  findUser(login) {
    for (let i = 0; i < userController.users.length; i++) {
      if (login == userController.users[i].login) {
        return userController.users[i];
      }
    }
  },

  logoutUser(login) {
    for (let i = 0; i < userController.users.length; i++) {
      if (login == userController.users[i].login) {
        userController.users.splice(i, 1);
      }
    }
  },
  async userAuth(req, res) {
    let user = await connect(req.body.login, req.body.pas);
    let client = { employee: user, empStatus: "" };
    client.empStatus = await client.employee.query(
      `SELECT emp_position FROM employee WHERE login=$1`,
      [client.employee.options.user]
    );
    await userController.saveUsers(client);
    res.json(client.employee.options.user);
  },
  async selTask(req, res) {
    const current = userController.findUser(req.body.login);
    if (current.pos == "admin") {
      const tasks = await current.emp.query(`SELECT * FROM task`);
      res.json(tasks.rows);
    } else if (current.pos == "common") {
      const tasks = await current.emp.query(
        `SELECT task_id, creation_date, start_date, finish_date, status, priority, manager_id FROM task`
      );
      res.json(tasks.rows);
    } else if (current.pos == "manager") {
      const tasks = await current.emp.query(`SELECT * FROM task`);
      res.json(tasks.rows);
    } else {
      res.json("error, wrong login");
    }
  },
  async addTask(req, res) {
    const current = userController.findUser(req.body.login);
    if (condition) {
    }
    const {
      creation_date,
      start_date,
      finish_date,
      status,
      priority,
      manager_id,
      worker_id,
    } = req.body;
    await current.query(
      `INSERT INTO task (creation_date, start_date, finish_date, status, priority, manager_id, worker_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        creation_date,
        start_date,
        finish_date,
        status,
        priority,
        manager_id,
        worker_id,
      ]
    );
    res.json("task have added");
  },
  async adminAddEmp(req, res) {
    const emp_password = crypto
      .createHash("sha256")
      .update(req.body.emp_password)
      .digest("hex");
    const { first_name, last_name, emp_position, salary, login } = req.body;
    await userController.current.query(
      `CREATE USER temp WITH PASSWORD \'$2\'IN ROLE $3`,
      [login, emp_position, emp_password]
    );
    await userController.current.query(
      `INSERT INTO employee (first_name, last_name, emp_position, salary, login, emp_password)
    VALUES ($1, $2, $3, $4, $5, $6)`,
      [first_name, last_name, emp_position, salary, login, emp_password]
    );
    res.json(emp_password);
  },
  async logOut(req, res) {
    const login = req.body.login;
    for (let i = 0; i < userController.users.length; i++) {
      if (login == userController.users[i].login) {
        userController.users.splice(i, 1);
      }
    }
  },
};

// async function saveUser(client) {
//   if (client.empStatus.rows[0] == "common") {
//     userController.commons.push(user);
//   } else if (client.empStatus.rows[0] == "manager") {
//     userController.managers.push(user);
//   } else if (client.empStatus.rows[0] == "admin") {
//     userController.admins.push(user);
//   }
// }

module.exports = userController;

// module.exports = new UserController();
