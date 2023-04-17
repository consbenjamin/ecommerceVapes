const { Product, Brand } = require("../db");

const filterByBrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    const products = await Product.findAll({
      where: { brandId },
      include: [{ model: Brand, attributes: ['name'] }],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};



module.exports = { filterByBrand }