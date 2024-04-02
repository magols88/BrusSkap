class BrusService {
  constructor(db) {
    this.client = db.client;
    this.brus = db.brus;
  }
  async getAllBrus() {
    return await this.brus.findAll();
  }
  async createBrus(name, price) {
    return await this.brus.create(name, price);
  }
}

module.exports = BrusService;
