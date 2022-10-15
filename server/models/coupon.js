import mongoose from 'mongoose';
const { Schema } = mongoose;

const discountSchema = new Schema({ type: String, value: Number });

const couponSchema = new Schema({
  id:    Number, 
  discount: discountSchema,
  items: [String],
  tags:  [String]
});

const Coupon = mongoose.model('Coupon', couponSchema);
export default Coupon;