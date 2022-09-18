const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const Product = require("../models/Product");

// ------>>> Create Product <<<------
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(200).send(newProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ------>>> Get An Individual Product <<<------
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ------>>> Get All Products <<<------
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find({});
    }

    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ------>>> Update Product <<<------
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ------>>> Delete Product <<<------
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
