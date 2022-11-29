const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
      date: { required: true, type: Date },
      items: { required: true, type: [] },
      approved: { type: Boolean },
      delivered: { type: Boolean },
      subtotal: { type: Number },
    },
    { timestamps: true }
)


module.exports = mongoose.model('Orders', schema)
