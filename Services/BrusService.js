class BrusService {
  constructor(db) {
    this.client = db.client;
    this.brus = db.brus;
    this.brusKjøp = db.brusKjøp;
    this.user = db.user;
  }
  async getAllBrus() {
    return await this.brus.findAll();
  }
  async createBrus(name, price) {
    return await this.brus.create(name, price);
  }
  async orderBrus(userId, quantity) {
    quantity = Number(quantity);
    const order = await this.brusKjøp.create({
      userId: userId,
      brusId: 1,
      quantity: quantity,
    });

    const user = await this.user.findByPk(userId);
    user.totalBrus = (Number(user.totalBrus) || 0) + quantity;
    await user.save();

    return {
      id: order.id,
      userId: userId,
      brusId: 1,
      totalBrus: user.totalBrus,
      quantity: quantity,
    };
  }
  async calculateTotalBrus(userId) {
    // Query the database for all orders made by the user
    const orders = await this.brusKjøp.findAll({ where: { userId: userId } });

    // Sum up the quantity of brus in the orders
    let totalBrus = 0;
    for (let order of orders) {
      totalBrus += order.quantity;
    }

    return totalBrus;
  }
}

module.exports = BrusService;
