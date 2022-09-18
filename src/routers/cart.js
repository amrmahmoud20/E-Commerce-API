const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");
const Cart = require("../models/Cart");

// ------>>> Create Cart <<<------
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    await newCart.save();
    res.status(200).send(newCart);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ------>>> Get User Cart <<<------
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ------>>> Get All Carts <<<------
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).send(carts);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ------>>> Update Cart <<<------
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedCart);
  } catch (e) {
    res.status(500).send(e);
  }
});

// ------>>> Delete Cart <<<------
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send("Cart has been deleted...");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
