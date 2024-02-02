const Product = require('../models/productsModels');

exports.getAllProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const skip = (page - 1) * limit;
    const sortOptions = sort ? { price: sort === 'asc' ? 1 : -1 } : {};
    const filter = query ? { category: query } : {};

    const products = await Product.find(filter)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip(skip);

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const response = {
      status: 'success',
      payload: products,
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page: parseInt(page),
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}` : null,
      nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}` : null,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
};

