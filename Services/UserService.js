class UserService {
  constructor(db) {
    this.client = db.client;
    this.user = db.user;
    this.brusKjøp = db.brusKjøp;
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

  async betaltBrus(userId) {
    const deletedOrders = await this.brusKjøp.destroy({
      where: { userId: userId, brusId: 1 },
    });

    return deletedOrders;
  }

  async deleteUser(userId) {
    const deletedUser = await this.user.destroy({
      where: { id: userId },
    });

    return deletedUser;
  }
}

module.exports = UserService;
