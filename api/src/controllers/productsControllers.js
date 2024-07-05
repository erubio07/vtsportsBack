const { Sequelize } = require("sequelize");
const { Product, Genre, Type, Waist } = require("../db");

const getAllProducts = async () => {
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: Genre,
        },
        {
          model: Type,
        },
        {
          model: Waist,
        },
      ],
    });
    return allProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllProductsAddmin = async () => {
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: Genre,
        },
        {
          model: Type,
        },
        {
          model: Waist,
        },
      ],
      paranoid: false,
    });
    return allProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getProductById = async (id) => {
  try {
    if (!id) throw new Error("id is required");
    const productById = await Product.findByPk(id, {
      include: [
        {
          model: Genre,
        },
        {
          model: Type,
        },
        {
          model: Waist,
        },
      ],
    });
    if (!productById) throw new Error("no products matches the id");
    return productById;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProduct = async (
  name,
  description,
  image,
  price,
  type,
  genre,
  waists
) => {
  try {
    if (!name || !description || !image || !price || !type || !genre || !waists)
      throw new Error("all fields are required");
    const newProduct = await Product.create({
      name,
      description,
      image,
      price,
      type,
      genre,
      waists,
    });
    await newProduct.setGenre(genre);
    await newProduct.setType(type);
    await newProduct.addWaist(waists);
    return {
      id: newProduct.id,
      name: newProduct.name,
      image: newProduct.image,
      price: newProduct.price,
      type: type,
      genre: genre,
      waists: waists,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (id) => {
  if (!id) throw new Error("id is required");
  try {
    await Product.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const restoreProduct = async (id) => {
  if (!id) throw new Error("id is required");
  try {
    await Product.restore({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRamdomProducts = async () => {
  try {
    const randomProducts = await Product.findAll({
      order: [Sequelize.literal("RANDOM()")],
      limit: 6,
    });
    return randomProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (
  id,
  name,
  description,
  image,
  price,
  type,
  genre,
  waists
) => {
  try {
    let product = await Product.findByPk(id);
    let updateProduct = await product.update({
      name,
      description,
      image,
      price,
      type,
      genre,
      waists,
    });
    console.log(updateProduct);
    await updateProduct.setGenre(genre);
    await updateProduct.setType(type);
    await updateProduct.setWaists(waists);
    return {
      id: updateProduct.id,
      name: updateProduct.name,
      description: updateProduct.description,
      image: updateProduct.image,
      price: updateProduct.price,
      type: type,
      genre: genre,
      waists: waists,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  restoreProduct,
  getAllProductsAddmin,
  getRamdomProducts,
  updateProduct,
};
