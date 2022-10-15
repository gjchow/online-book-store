// Followed Documentation: https://mongoosejs.com/docs/guide.html

import mongoose from 'mongoose';
const { Schema } = mongoose;

const itemSchema = new Schema({
  name:  String, 
  price: Number,
  image: String,
  tags: [String]
});

const Item = mongoose.model('Item', itemSchema);
export default Item;