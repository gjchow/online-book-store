import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { 
  validateCoupon, 
  checkCoupon, 
  getAllCoupons,
  getAllItems,
  getCoupon
} from "./database.js";

// Setup server
const app = express();
app.use(cors());
app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/items', async (req, res) => {
  res.send({ 
    data: await getAllItems() 
  });
});

app.get('/api/coupons', async (req, res) => {
  res.send({
    data: await getAllCoupons()
  });
});

app.get('/api/coupon/:id', async (req, res) => {
  res.send({
    data: await getCoupon(req.params.id)
  });
});

app.get('/api/validate-coupon/:id', async (req, res) => {
  res.send({
    valid: await validateCoupon(req.params.id)
  });
});

app.post('/api/check-coupon/:id', async (req, res) => {
  console.log(req.body)
  res.send({
    apply: await checkCoupon(req.params.id, req.body.itemNames)
  });
});

export default app;