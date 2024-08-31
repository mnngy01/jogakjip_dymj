// commentService.js
// 비즈니스 로직
import commentRepository from "../repositories/commentRepository.js";


// 댓글 등록
const createComment = async (postId, commentData) => {
  const newComment = await commentRepository.createComment(postId, commentData);

  return {
    id: newComment.id,
    nickname: newComment.nickname,
    content: newComment.content,
    createdAt: newComment.createdAt,
  }
};

export default {
  createComment
}