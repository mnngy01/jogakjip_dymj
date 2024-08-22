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


// 그룹 수정하기
groupController.put('/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const updateData = req.body;

  try {
    const updateGroup = await groupService.update(parseInt(groupId, 10), updateData);
    return res.status(200).json(updateGroup);
  } catch (error) {
    if (error.status === 403) {
      req.status(403).json({ message: "비밀번호가 틀렸습니다" });
    } else if (error.status === 404) {
      req.status(404).json({ message: "존재하지 않습니다" });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }
  
});


// 그룹 삭제하기
groupController.delete('/:groupId', async (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;

  // 비밀번호 미입력시
  if (!password) {
    return res.status(400).json({ message: "잘못된 요청입니다" });
  }

  try {
    const result = await groupService.deleteGroup(parseInt(groupId, 10), password);
    res.status(200).json(result);
  } catch (error) {
    if (error.status === 403) {
      res.status(403).json({ message: error.message });
    } else if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }

});


// 그룹 상세 정보 조회
groupController.get('/:groupId', async (req, res) => {
  const { groupId } = req.params;

  if (isNaN(groupId)) {
    return res.status(400).json({ message: "잘못된 요청입니다" });
  }

  try {
    const groupDetails = await groupService.getGroupDetails(paseInt(groupId, 10));
    res.status(200).json(groupDetails);
  } catch (error) {
    if (error.status === 404 ) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }

});


// 그룹 조회 권한 확인하기
groupController.post('/:groupId/verify-password', async (req, res) => {
  const { groupId } = req.params;
  const { password } = req.body;

  try {
    const result = await groupService.verifyGroupPassword(paseInt(groupId, 10), password);
    res.status(200).json(result);
  } catch (error) {
    if (error.status === 401) {
      res.status(401).json({ message: error.message });
    } else if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }

});


// 그룹 공감하기
groupController.post('/:groupId/like', async (req, res) => {
  const { groupId } = req.params;

  try {
    const result = await groupService.likeGroup(parseInt(groupId, 10));
    res.status(200).json(result);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }

});

export default groupController;