const Order = require("../model/Order");
const Products = require("../model/Product");

exports.getOrderProduct = async (req, res, next) => {
  try {
    const result = await Order.find();
    return res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.addOrderProduct = async (req, res, next) => {
  try {
    const orderList = new Order({
      order: req.body.order,
      name: name,
      addressDestination: address,
    });
    const resProd = await Products.find();
    let array = [...resProd];
    let newOrder = [...orderList.order];
    let filter = newOrder.map((order) => {
      let [newArray] = array.filter((val) => {
        if (val._id.equals(order._id)) {
          return val;
        }
      });
      if (newArray !== undefined) {
        return {
          ...newArray._doc,
          quantity: order.quantity,
        };
      }
    });
    filter = filter.filter((el) => el !== undefined);
    orderList.order = filter;
    orderList.totalPrice = filter.reduce((prev, curr) => {
      return prev + curr.price * curr.quantity;
    }, 0);
    if (orderList.order.length === 0) {
      throw new Error('Order minimum 1 item');
    }
    const savedOrder = await orderList.save();
    return res.json({ msg: "Success Add Order",
    order: savedOrder});
  } catch (e) {
    next(e);
  }
};
