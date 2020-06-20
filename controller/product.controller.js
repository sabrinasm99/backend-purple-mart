const Products = require("../model/Product");
const fse = require("fs-extra");
const axios = require('axios');

exports.getAllProduct = async (req, res, next) => {
  try {
    const data = await Products.find();
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

exports.getSpecificProduct = async (req, res, next) => {
  try {
    const data = await Products.findById(req.params.id);
    return res.json(data);
  } catch (e) {
    next(e);
  }
};

exports.uploadProduct = async (req, res, next) => {
  try {
    const newProduct = new Products({
      name: req.body.name,
      price: req.body.price,
    });
    const productImage = req.files.productImage;
    console.log(productImage, "PRODUCTIMAGE");
    const time = (new Date()).getTime();
    await productImage.mv(`./image/${req.files.productImage.name}_${time}`);
    newProduct.image = `image/${productImage.name}_${time}`;
    console.log(newProduct.image, "NEWPRODUCTIMAGE");
    const dataUploaded = await newProduct.save();
    // axios.post('https://api.netlify.com/build_hooks/5eedd6d869e70dba83a4fe29');
    res.json(dataUploaded);
  } catch (e) {
    next(e);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    console.log("Masuk Router Put");
    const data = await Products.findById(req.params.id);
    if (data) {
      data.name = req.body.name;
      data.price = req.body.price;
      const oldImage = data.image; // old image file in database

      if (req.files) {
        // request new file {object}
        await fse.remove(`./${oldImage}`); // remove old image file
        const newImage = req.files.productImage; // new image file {object}
        const time = (new Date()).getTime();
        await newImage.mv(`./image/${newImage.name}_${time}`); // move new image file to directory
        data.image = `image/${newImage.name}_${time}`; // save new image file in database (only string)
      }
      const savedData = await data.save();
      axios.post('https://api.netlify.com/build_hooks/5eedd6d869e70dba83a4fe29');
      return res.json({ msg: "Data Updated", data: savedData });
    } else {
      throw new Error("Data is not found");
    }
  } catch (e) {
    next(e);
  }
};

exports.removeProduct = async (req, res, next) => {
  try {
    console.log("Masuk Router Delete");
    const data = await Products.findById(req.params.id);
    if (data) {
      console.log("Masuk IF DATA");
      const file = data.image;
      const name = data.name;
      await fse.remove(`./${file}`);
      console.log("Success Delete Image");
      const dataRemoved = await data.remove();
      axios.post('https://api.netlify.com/build_hooks/5eedd6d869e70dba83a4fe29');
      return res.json({ msg: `${name} removed`, data: dataRemoved });
    } else {
      throw new Error("Data is not found");
    }
  } catch (e) {
    next(e);
  }
};
