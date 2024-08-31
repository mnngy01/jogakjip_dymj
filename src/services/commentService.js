// commentService.js
// 비즈니스 로직
import commentRepository from "../repositories/commentRepository.js";
import postRepository from "../repositories/postRepository.js";


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


// 댓글 목록 조회
const getComments = async ({ postId, page, pageSize }) => {
  const { comments, totalItemCount } = await commentRepository.getComments({
    postId,
    page,
    pageSize,
  });

  const totalPages = Math.ceil(totalItemCount / pageSize);

  return {
    currentPage: page,
    totalPages,
    totalItemCount,
    data: comments
  };
};


export default {
  createComment,
  getComments,
}