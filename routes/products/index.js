const router = require("express").Router();
const Products = require("../../model/Product");
const fse = require("fs-extra");
const fileUpload = require("express-fileupload");

// Utils
const checkAdmin = require("../../utils/checkAdmin");
const checkLogin = require("../../utils/checkLogin");

// UPLOAD PRODUCT
router.post(
  "/upload-product",
  // checkLogin(),
  // checkAdmin(),
  fileUpload(),
  async (req, res, next) => {
    try {
      const newProduct = new Products({
        name: req.body.name,
        price: req.body.price
      });
      const productImage = req.files.productImage;
      console.log(productImage, "PRODUCTIMAGE");
      await productImage.mv(`./image/${req.files.productImage.name}`);
      newProduct.image = `image/${productImage.name}`;
      console.log(newProduct.image, "NEWPRODUCTIMAGE");
      const dataUploaded = await newProduct.save();
      res.json(dataUploaded);
    } catch (e) {
      next(e);
    }
  }
);

// GET PRODUCT
router.get("/get-product", async (req, res, next) => {
  try {
    const data = await Products.find();
    return res.json(data);
  } catch (e) {
    next(e);
  }
});

// GET PRODUCT SPECIFIC
router.get("/get-product/:id", async (req, res, next) => {
  try {
    const data = await Products.findById(req.params.id);
    return res.json(data);
  } catch (e) {
    next(e);
  }
});

// UPDATE PRODUCT
router.put(
  "/update-product/:id",
  // checkLogin(),
  // checkAdmin(),
  fileUpload(),
  async (req, res, next) => {
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
          await newImage.mv(`./image/${newImage.name}`); // move new image file to directory
          data.image = `image/${newImage.name}`; // save new image file in database (only string)
        }
        const savedData = await data.save();
        return res.json({ msg: "Data Updated", data: savedData });
      } else {
        throw new Error("Data is not found");
      }
    } catch (e) {
      next(e);
    }
  }
);

// DELETE PRODUCT
router.delete(
  "/remove-product/:id",
  // checkLogin(),
  // checkAdmin(),
  async (req, res, next) => {
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
        return res.json({ msg: `${name} removed`, data: dataRemoved });

        // fs.unlink(`./${file}`, async () => {
        //   const dataRemoved = await data.remove();
        //   return res.json({ msg: `${name} removed`,
        //   data: dataRemoved
        //   });
        // });
      } else {
        throw new Error("Data is not found");
      }
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
