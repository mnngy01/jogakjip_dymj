// commentController.js
// API 요청 처리
import commentService from "../services/commentService.js";


// 댓글 등록
const createComment = async (req, res) => {
  const { postId } = req.params;
  const commentData = req.body;

  try {
    const newComment = await commentService.createComment(parseInt(postId, 10), commentData);
    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json({ message: "잘못된 요청입니다" });
  }
};


// 댓글 목록 조회
const getComments = async (req, res) => {
  const { postId } = req.params;
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const result = await commentService.getComments({
      postId: parseInt(postId, 10),
      page: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "잘못된 요청입니다" });
  }
};


// 댓글 수정
const updateComment = async (req, res) => {
  const { commentId } = req.params;
  const { password } = req.body;
  const commentData = req.body;

  try {
    const updatedComment = await commentService.updateComment(parseInt(commentId, 10), commentData, password);
    res.status(200).json(updatedComment);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else if (error.status === 403) {
      res.status(403).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }
};


export default {
  createComment,
  getComments,
  updateComment,
}