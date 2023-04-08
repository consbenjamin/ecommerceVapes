const { Product } = require('../db');
const data = require('../data.json');
const { Op } = require('sequelize');


const getProducts = async (req, res) => {
  const { name } = req.query;

  if (name) {  
    const productsByName = await Product.findAll({
      where: { name: name },
      attributes: ["name", "description", "img", "flavor", "price, id"],
    });
    return res.status(200).send(productsByName);
  }

  const existingProducts = await Product.findAll();
  const existingProductNames = existingProducts.map(p => p.name);
  
  const allProducts = data.filter(p => !existingProductNames.includes(p.name))
    .map(p => ({
      name: p.name,
      description: p.description,
      price: p.price,
      img: p.img,
      flavor: p.flavor.flavor1,
      id: p.id
    }));

  await Product.bulkCreate(allProducts, { updateOnDuplicate: ["name"] });

  const createdProducts = await Product.findAll({
    attributes: ["name", "description", "img", "flavor", "price", "id"],
  });

  return res.status(200).send(createdProducts);
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if(product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'No se encontró el producto con el id especificado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al intentar obtener el producto' });
  }

};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getProductsByName = async (req, res) => {
  try {
    const { name } = req.params;

    const product = await Product.findAll({ where: { name: { [Op.iLike]: `%${name.toLowerCase()}%` } } });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'No se encontró el producto con el nombre especificado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al intentar obtener el producto' });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const postProducts = async (req, res) => {
  try {
    const {name, img, description, price, flavor, id} = req.body;
    const product = await Product.create({name, img, description, price, flavor, id});
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({message: `Error al crear producto: ${error.message}`});
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const deleteProduct = async(req, res) => {
  try {
    const { id } = req.params;

    const numDeleted = await Product.destroy({
      where: { id } 
    });

    if (numDeleted > 0) {
      res.status(200).json({ message: `El producto con id =${id} fue eliminado exitosamente` });
    } else {
      res.status(404).json({ message: 'No se encontró el producto con el id especificado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al intentar eliminar el producto' });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, description, price, flavor } = req.body;

    const productDb = await Product.findByPk(id);

    if (!productDb) {
      return res.status(404).json({message: 'No se encontró el producto con el id especificado' });
    }

    // Verificación de campos necesarios
    if (!name || !img || !description || !price || !flavor) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const updatedProduct = await productDb.update({
      name,
      img,
      description,
      price,
      flavor
    });

    res.status(200).json(updatedProduct);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al intentar actualizar el producto' });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = {getProducts, getProductsById, getProductsByName , postProducts, deleteProduct, editProduct};





// Codigo para hacer consultas solo a la base de datos si en un futuro elimino el json. 

// const { Product } = require('../db');

// const getProducts = async (req, res) => {
//   const { name } = req.query;

//   if (name) {  
//     const productsByName = await Product.findAll({
//       where: { name: name },
//       attributes: ["name", "description", "img", "flavor", "price"],
//     });
//     return res.status(200).send(productsByName);
//   }

//   const allProducts = await Product.findAll({
//     attributes: ["name", "description", "img", "flavor", "price"],
//   });

//   return res.status(200).send(allProducts);
// }

// module.exports = { getProducts }


