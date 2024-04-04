class BrusService {
  constructor(db) {
    this.client = db.client;
    this.brus = db.brus;
    this.brusKjøp = db.brusKjøp;
  }
  async getAllBrus() {
    return await this.brus.findAll();
  }
  async createBrus(name, price) {
    return await this.brus.create(name, price);
  }
  async orderBrus(userId, quantity) {
    const order = this.brusKjøp.create({
      userId: userId,
      brusId: 1,
      quantity: quantity,
    });

    return {
      id: order.id,
      userId: userId,
      brusId: 1,
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
