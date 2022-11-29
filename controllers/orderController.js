// documentation 
// cheat sheet
// https://isbhargav.github.io/posts/mongoose/

const OrdersModel = require("../db-models/orders.model")

module.exports = async function getOrders(_, res) {
  res.send(await OrdersModel.find())
}