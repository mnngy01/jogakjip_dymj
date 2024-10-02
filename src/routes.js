import express from 'express';

import groupController from './controllers/groupController.js';
import postController from './controllers/postController.js';
import commentController from './controllers/commentController.js';
import imageController from './controllers/imageController.js';
// const fileUpload = require("./middlewares/file-upload");

const router = express.Router();

// group
router.post('/groups', groupController.createGroup);          // 그룹 생성하기
router.get('/groups', groupController.getGroups);             // 그룹 목록 조회
router.put('/groups/:groupId', groupController.updateGroup);  // 그룹 수정
router.delete('/groups/:groupId', groupController.deleteGroup); // 그룹 삭제
router.get('/groups/:groupId', groupController.getGroupDetail); // 그룹 상세 정보
router.post('/groups/:groupId/verify-password', groupController.verifyGroupPassword); // 그룹 조회 권한 확인
router.post('/groups/:groupId/like', groupController.likeGroup);  // 그룹 공감하기
router.get('/groups/:groupId/is-public', groupController.checkGroupVisibility); // 그룹 공개여부 확인


// post
router.post('/groups/:groupId/posts', postController.createPost); // 게시글 등록
router.get('/groups/:groupId/posts', postController.getPosts);    // 게시글 목록 조회
router.put('/posts/:postId', postController.updatePost);          // 게시글 수정
router.delete('/posts/:postId', postController.deletePost);       // 게시글 삭제
router.get('/posts/:postId', postController.getPostDetail);       // 게시글 상세 정보 조회
router.post('/posts/:postId/verify-password', postController.verifyPostPassword); // 게시글 조회 권한 확인
router.post('/posts/:postId/like', postController.likePost);      // 게시글 공감
router.get('/posts/:postId/is-public', postController.checkPostVisibility); // 게시글 공개 여부 확인


// comment
router.post('/posts/:postId/comments', commentController.createComment);  // 댓글 등록
router.get('/posts/:postId/comments', commentController.getComments);     // 댓글 목록 조회
router.put('/comments/:commentId', commentController.updateComment);      // 댓글 수정
router.delete('/comments/:commentId', commentController.deleteComment);   // 댓글 삭제


// image
router.use('/image', imageController);

export default router;
