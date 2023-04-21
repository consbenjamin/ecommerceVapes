const { Op } = require('sequelize');
const { Product, Brand } = require("../db");

const filterByBrand = async (req, res) => {
  const { brandId } = req.params;

  try {
    let products = await Product.findAll({
      where: { brandId },
      include: [{ model: Brand, attributes: ['name'] }],
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};


const filterByPrice = async (req, res) => {
  const { minPrice, maxPrice } = req.query;

  try {
    let products = await Product.findAll({
      where: {
        price: {
          [Op.between]: [minPrice, maxPrice]
        }
      }
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};

const sortByPrice = async (req, res) => {
  const { order } = req.query;

  try {
    let products = await Product.findAll({
      order: order === 'asc' ? [['price', 'ASC']] : [['price', 'DESC']]
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
};



module.exports = { filterByBrand, filterByPrice, sortByPrice }