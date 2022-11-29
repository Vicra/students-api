const OrdersModel = require('../db-models/orders.model')

const ordersJSON = require('./orders.json')

module.exports = loadData = async () => {
    for (const order of ordersJSON) {
        await OrdersModel.create(order)
    }

    console.log(` --- Loaded ${ordersJSON.length} orders ---`)
}
