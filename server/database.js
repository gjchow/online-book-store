import mongoose from 'mongoose';
import "dotenv/config";
import Item from './models/item.js';
import Coupon from './models/coupon.js';

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/");
}

async function getAllItems() {
  const items = await Item.find({});
  return items;
}

async function getAllCoupons() {
  const coupons = await Coupon.find({});
  return coupons;
}

async function validateCoupon(couponId) {
  const coupons = await Coupon.find({ id: couponId });

  if (coupons.length == 0) {
    return false;
  }

  return true;
}

async function checkCoupon(couponId, items) {
  const coupons = await Coupon.find({ id: couponId });

  const coupon =  coupons[0];

  if (coupon.tags.find(tag => tag == "ALL")){
    return true;
  }

  const couponItems =  coupons[0].items;

  for (let i = 0; i < couponItems; i++) {
    if (items.find(item => couponItems[i] == item)) {
      return true;
    }
  }

  return false;
}

export {
  connectDB,
  getAllItems,
  getAllCoupons,
  validateCoupon,
  checkCoupon,
}