// postController
// API 요청 처리
import express from 'express';
import postService from '../services/postService.js';


// 게시글 등록하기
const createPost = async (req, res) => {
  const { groupId } = req.params;
  const postData = req.body;

  try {
    const newPost = await postService.createPost(parseInt(groupId, 10), postData);
    res.status(200).json(newPost);
  } catch (error) {
    if (error.status === 403) {
      res.status(403).json({ message: error.message });
    } else if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }
};

export default {
  createPost,
}