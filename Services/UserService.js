class UserService {
  constructor(db) {
    this.client = db.client;
    this.user = db.user;
  }

  async getAllUsers() {
    return await this.user.findAll();
  }

  async getUserByUsername(username) {
    return await this.user.findOne({
      where: {
        username: username,
      },
    });
  }

  async createUser(name, username, email, hashedPassword, team) {
    return await this.user.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      team: team,
    });
  }
}

module.exports = UserService;
