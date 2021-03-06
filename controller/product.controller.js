const Products = require("../model/Product");
const fse = require("fs-extra");
const Fuse = require('fuse.js');
const axios = require('axios');
const options = {
  includeScore: true,
  keys: ['name']
}

exports.getAllProduct = async (req, res, next) => {
  try {
    const data = await Products.find();
    let result = [...data];
    
    const fuse = new Fuse(result, options);
    if (req.query.search) {
      result = fuse.search(req.query.search).map(val => {
        return {
          ...val.item._doc,
          score: (1 - val.score) * 100
        }
      })
    };
    return res.json(result);
  } catch (e) {
    next(e);
  }
};

exports.getCategoryProduct = async (req, res, next) => {
  try {
    const data = await Products.find();
    const filterData = data.filter(val => val.queryCategory === req.query.queryCategory);
    let result = [...filterData];
    if (req.query.search) {
      result = fuse.search(req.query.search).map(val => {
        return {
          ...val.item._doc,
          score: (1 - val.score) * 100
        }
      })
    }
    return res.json(result);
  } catch (e) {
    next(e);
  }
}

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
      category: req.body.category,
      queryCategory: req.body.category.split(' ')[0]
    });
    const productImage = req.files.productImage;
    const productImageName = req.files.productImage.name;
    const pictName = productImageName.split('.')[0];
    const jpg = productImageName.split('.')[1];
    const time = (new Date()).getTime();
    await productImage.mv(`./image/${pictName}_${time}.${jpg}`);
    newProduct.image = `image/${pictName}_${time}.${jpg}`;
    const dataUploaded = await newProduct.save();
    axios.post('https://api.netlify.com/build_hooks/5f0de3f7df09487c1915c7a5');
    res.json({
      message: 'Success Uploaded',
      data: dataUploaded});
  } catch (e) {
    next(e);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const data = await Products.findById(req.params.id);
    if (data) {
      data.name = req.body.name;
      data.price = req.body.price;
      data.category = req.body.category;
      data.queryCategory = req.body.category.split(' ')[0];
      const oldImage = data.image; // old image file in database

      if (req.files) {
        // request new file {object}
        await fse.remove(`./${oldImage}`); // remove old image file
        const newImage = req.files.productImage; // new image file {object}
        const newImageName = req.files.productImage.name;
        const pictName = newImageName.split('.')[0];
        const jpg = newImageName.split('.')[1];
        const time = (new Date()).getTime();
        await newImage.mv(`./image/${pictName}_${time}.${jpg}`); // move new image file to directory
        data.image = `image/${pictName}_${time}.${jpg}`; // save new image file in database (only string)
      }
      const savedData = await data.save();
      axios.post('https://api.netlify.com/build_hooks/5f0de3f7df09487c1915c7a5');
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
    const data = await Products.findById(req.params.id);
    if (data) {
      const file = data.image;
      const name = data.name;
      await fse.remove(`./${file}`);
      const dataRemoved = await data.remove();
      axios.post('https://api.netlify.com/build_hooks/5f0de3f7df09487c1915c7a5');
      return res.json({ msg: `${name} removed`, data: dataRemoved });
    } else {
      throw new Error("Data is not found");
    }
  } catch (e) {
    next(e);
  }
};
