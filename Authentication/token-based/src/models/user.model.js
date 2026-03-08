const users = [];

class User {
  constructor(username, email, password) {
    this.id = Date.now().toString();
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async findByEmail(email) {
    // Simulating async DB operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users.find((user) => user.email === email));
      }, 50);
    });
  }

  static async findById(id) {
    // Simulating async DB operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(users.find((user) => user.id === id));
      }, 50);
    });
  }

  static async save(user) {
    // Simulating async DB operation
    return new Promise((resolve) => {
      setTimeout(() => {
        users.push(user);
        resolve(user);
      }, 50);
    });
  }

  static clear() {
      // Clear data for testing purposes
      users.length = 0;
  }
}

module.exports = User;
