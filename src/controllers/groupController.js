import express from 'express';
import groupService from '../services/groupService.js';


const groupController = express.Router();

// 그룹 등록하기
productController.post('/', async (req, res, next) => {
  const createGroup = await groupService.create(req.body);
  return res.json(createGroup);
});


export default productController;