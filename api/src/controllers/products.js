const { Product, Brand } = require('../db');
const data = require('../data.json');
const { Op } = require('sequelize');


const getProducts = async (req, res) => {
  const { name } = req.query;

  if (name) {  
    const productsByName = await Product.findAll({
      where: { name: name },
      attributes: ["name", "description", "img", "flavor", "price", "id"],
      include: [{ model: Brand, attributes: ["name"] }]
    });
    return res.status(200).send(productsByName);
  }

  const existingProducts = await Product.findAll();
  const existingProductNames = existingProducts.map(p => p.name);
  
  const allProducts = data.filter(p => !existingProductNames.includes(p.name))
    .map(async p => {
      let brand = await Brand.findOrCreate({ where: { name: p.brand.name }});
      return {
        name: p.name,
        description: p.description,
        price: p.price,
        img: p.img,
        flavor: p.flavor.flavor1,
        id: p.id,
        brandId: brand[0].id
      };
    });

  await Product.bulkCreate(await Promise.all(allProducts), { updateOnDuplicate: ["name"] });

  const response = await Product.findAll({
    attributes: ["name", "description", "img", "flavor", "price", "id", ],
    include: [{ model: Brand, as: 'brand', attributes: ["name"] }]
  });

  return res.status(200).send(response);
};



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [{ model: Brand, as: 'brand', attributes: ["name"] }]
    });

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
    const {name, img, description, price, flavor, id, brand} = req.body;

    let brandObj = await Brand.findOne({ where: { name: brand } });

    if (!brandObj) {
      brandObj = await Brand.create({ name: brand });
    }

    const product = await Product.create({name, img, description, price, flavor, id, brandId: brandObj.id}, { include: Brand });
    
    const createdProduct = await Product.findOne({
      where: { id: product.id },
      attributes: ["name", "description", "img", "flavor", "price", "id"],
      include: [{ model: Brand, as: 'brand', attributes: ["name"] }]
    });
    res.status(200).send(createdProduct);
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
    const { name, img, description, price, flavor, brand } = req.body;

    const productDb = await Product.findByPk(id);

    if (!productDb) {
      return res.status(404).json({message: 'No se encontró el producto con el id especificado' });
    }

    // Crear la marca si no existe
    let brandObj = await Brand.findOne({ where: { name: brand } });
    if (!brandObj) {
      brandObj = await Brand.create({ name: brand });
    }

    const updatedProduct = await productDb.update({
      name,
      img,
      description,
      price,
      flavor,
      brandId: brandObj.id,
    });

    // Obtener el producto actualizado con la información de la marca
    const editedProduct = await Product.findOne({
      where: { id },
      attributes: ["name", "description", "img", "flavor", "price", "id"],
      include: [{ model: Brand, as: 'brand', attributes: ["name"] }]
    });

    res.status(200).json(editedProduct);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al intentar actualizar el producto' });
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////



const getBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({
      attributes: ['id', 'name'],
    });

    res.status(200).json(brands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving brands', error: error.message });
  }
};



module.exports = {getProducts, getProductsById, getProductsByName , postProducts, deleteProduct, editProduct, getBrands};





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




// const editProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, img, description, price, flavor, brandName } = req.body;

//     const productDb = await Product.findByPk(id);

//     if (!productDb) {
//       return res.status(404).json({message: 'No se encontró el producto con el id especificado' });
//     }

//     // Verificación de campos necesarios
//     if (!name || !img || !description || !price || !flavor || !brandName) {
//       return res.status(400).json({ message: 'Faltan campos requeridos', errors: ['name', 'img', 'description', 'price', 'flavor', 'brandName'] });
//     }

//     const brand = await Brand.findOne({ where: { name: brandName } });

//     if (!brand) {
//       return res.status(404).json({ message: 'No se encontró la marca especificada' });
//     }

//     const updatedProduct = await productDb.update({
//       name,
//       img,
//       description,
//       price,
//       flavor,
//       brandId: brand.id,
//     });

//     res.status(200).json(updatedProduct);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Ocurrió un error al intentar actualizar el producto' });
//   }
// };