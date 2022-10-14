import mongoose from 'mongoose';
const { Schema } = mongoose;

const couponSchema = new Schema({
  id:    Number, 
  discount: {
    type: String,
    value: Number
  },
  items: [String],
  tags:  [String]
});

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;