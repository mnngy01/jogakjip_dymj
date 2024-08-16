// groupController
// API 요청 처리
import express from 'express';
import groupService from '../services/groupService.js';


const groupController = express.Router();


// 그룹 등록하기
groupController.post('/', async (req, res, next) => {
  const createGroup = await groupService.create(req.body);
  return res.json(createGroup);
});

// 그룹 목록 조회하기
groupController.get('/', async (req, res, next) => {
  /**
   * 쿼리 파라미터
   * - page : number (현재 페이지 번호)
   * - pageSize : number (페이지당 아이템 수)
   * - sortBy : latest | mostPosted | mostLiked |  mostBadge (정렬 기준)
   * - keyword : string (검색어)
   * - isPublic : boolean (공개 / 비공개 여부)
   */
  /*
  const page = Number(req.query.page);
  const pageSize = Number(req.query.pageSize);
  const sortBy = req.query.sortBy;
  const keyword = req.query.keyword;
  const isPublic = Boolean(req.query.isPublic);
  */

  
  try {
      const result = await groupService.getGroups({
      page: Number(req.query.page),
      pageSize: Number(req.query.pageSize),
      sortBy: req.query.sortBy,
      keyword: req.query.keyword,
      isPublic: Boolean(req.query.isPublic)
    });

    res.status(200).json({
      currentPage: result.currentPage,
      totalPages: result.totalPages,
      totalItemCount: result.totalItemCount,
      data: result.groups.map(group => ({
          id: group.id,
          name: group.name,
          imageUrl: group.imageUrl,
          isPublic: group.isPublic,
          likeCount: group.likeCount,
          badgeCount: group.badgeCount,
          postCount: group.postCount,
          createdAt: group.createdAt.toISOString(),
          introduction: group.introduction
      }))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default productController;