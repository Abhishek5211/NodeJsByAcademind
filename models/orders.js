const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  user: {
    userId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name:{
        type: String,
        required:true,
    }
  },

  order: [{
     productId: {
            type: Schema.Types.ObjectId,
            required:true,
            ref:"Product"
        },
        quantity: { type: Number, required: true }}],
});

module.exports = model('Order',orderSchema); 