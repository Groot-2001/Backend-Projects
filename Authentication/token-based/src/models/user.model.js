const users = [];

function logUsers(operation) {
  console.log(`\n[${operation}] Current Users:`);
  console.table(users);
}

class User {
  constructor(username, email, password) {
    this.id = Date.now().toString();
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async findByEmail(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find((u) => u.email === email);
        logUsers("findByEmail");
        resolve(user);
      }, 50);
    });
  }

  static async findById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find((u) => u.id === id);
        logUsers("findById");
        resolve(user);
      }, 50);
    });
  }

  static async save(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        users.push(user);
        logUsers("save");
        resolve(user);
      }, 50);
    });
  }

  static clear() {
    users.length = 0;
    logUsers("clear");
  }
}

module.exports = User;