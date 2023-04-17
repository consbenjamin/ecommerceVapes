const { Product, Brand } = require("../db");



const filterByBrand = async (req, res) => {
  const { brandId } = req.query;

  if (!brandId)
    return res.status(404).json({ message: "No se econtro ese brand." });

  try {
    let products = await Product.findAll({
      attributes: [
        "name",
        "id",
        "img",
        "description",
        "flavor",
        "price",
        "brandId",
      ],
      include:{
        model:Brand
      }
    });

    let productsBrand = products.filter((el) => el.brandId == brandId);
    productsBrand.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (b.id > a.id) {
        return -1;
      }
      return 0;
    });

    return productsBrand.length
      ? res.status(200).send(productsBrand)
      : res.status(404).send("No se recibio un brand correcto");

  } catch (error) {
    console.error(error);
    next();
  }
};

module.exports = { filterByBrand }