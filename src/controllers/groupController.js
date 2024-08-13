import express from 'express';

const groupController = express.Router();

productController.post('/', async (req, res, next) => {
  const createGroup = await groupService.create(req.body);
  return res.json(createGroup);
});

export default productController;