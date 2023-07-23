const BuyerOrder = require("../../../models/BuyerOrder");
const Product = require("../../../models/Product");
const SellerOrder = require("../../../models/SellerOrder");
const sendErrorResponse = require("../../../utils/send-error-response");

module.exports = async (req, res) => {
  try {
    
    let ownerProducts = {};
    const userId = req.user._id;
    for(let item of req.body.products){
      let product = await Product.findOne({ _id: item.product });
      if (!product) {
        throw new Error("product not found "+item.product+".");
      }
      if(ownerProducts.hasOwnProperty(product.userId)){
          ownerProducts[product.userId]["products"].push(item)
          if(item.customization.length > 0){
            ownerProducts[product.userId]["total"] = (product.price+product.customizationPrice) * item.quantity
          }
          else{
            ownerProducts[product.userId]["total"] = product.price * item.quantity
          }
      }else{
        let key = product.userId.toString()
        let total = 0;
        if(item.customization.length > 0){
          total = (product.price+product.customizationPrice) * item.quantity
        }
        else{
          total = product.price * item.quantity
        }
        ownerProducts[key] = {"products": item, "total": total};
      }
    }


    const buyerOrder = await BuyerOrder.create({
      products: req.body.products,
      total: req.body.total,
      shippingAddress: req.body.shippingAddress,
      buyer: userId,
      paymentMethod: "homeDilevery"
    });

    for(let key of ownerProducts.keys()){
      await SellerOrder.create({
        products: ownerProducts[key]["products"],
        total: ownerProducts[key]["total"],
        shippingAddress: req.body.shippingAddress,
        buyer: userId,
        seller: key,
        buyerOrder: buyerOrder._id,
        paymentMethod: "homeDilevery"
      });
    }
    

    return res.status(200).json({
      code: 200,
      status: true,
      message: "order added successfully",
      result: buyerOrder,
    });
  } catch (error) {
    sendErrorResponse(
      res,
      400,
      "Failed to add the order.",
      error.message
    );
  }
};
