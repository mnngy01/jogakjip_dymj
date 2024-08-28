import express from 'express';

import groupController from './controllers/groupController.js';
import postController from './controllers/postController.js';

const router = express.Router();

// group
router.post('/api/groups', groupController.createGroup);          // 그룹 생성하기
router.get('/api/groups', groupController.getGroups);             // 그룹 목록 조회
router.put('/api/groups/:groupId', groupController.updateGroup);  // 그룹 수정
router.delete('/api/groups/:groupId', groupController.deleteGroup); // 그룹 삭제
router.get('/api/groups/:groupId', groupController.getGroupDetail); // 그룹 상세 정보
router.post('/api/groups/:groupId/verify-password', groupController.verifyGroupPassword); // 그룹 조회 권한 확인
router.post('/api/groups/:groupId/like', groupController.likeGroup);  // 그룹 공감하기
router.get('/api/groups/:groupId/is-public', groupController.checkGroupVisibility); // 그룹 공개여부 확인


// post
router.post('/api/groups/:groupId/posts', postController.createPost); // 게시글 등록
router.get('/api/groups/:groupId/posts', postController.getPosts);    // 게시글 목록 조회
router.put('/api/posts/:postId', postController.updatePost);          // 게시글 수정
router.delete('/api/posts/:postId', postController.deletePost);       // 게시글 삭제
router.get('/api/posts/:postId', postController.getPostDetail);       // 게시글 상세 정보 조회
router.post('/api/posts/:postId/verify-password', postController.verifyPostPassword); // 게시글 조회 권한 확인
router.post('/api/posts/:postId/like', postController.likePost);      // 게시글 공감
router.get('/api/posts/:postId/is-public', postController.checkPostVisibility); // 게시글 공개 여부 확인



export default router;