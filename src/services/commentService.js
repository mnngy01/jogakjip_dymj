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
  };
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


// 댓글 수정
const updateComment = async (commentId, commentData, password) => {
  const existingComment = await commentRepository.getCommentById(commentId);

  // 댓글이 존재하지 않는 경우
  if (!existingComment) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 비밀번호가 틀린 경우
  if (existingComment.password !== password) {
    throw { status: 403, message: "비밀번호가 틀렸습니다" };
  }

  return await commentRepository.updateComment(commentId, commentData);
};


// 댓글 삭제
const deleteComment = async (commentId, password) => {
  const comment = await commentRepository.getCommentById(commentId);

  // 댓글이 존재하지 않는 경우
  if (!comment) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 비밀번호 검증
  if (comment.password !== password) {
    throw { status: 403, message: "비밀번호가 틀렸습니다" };
  }

  // 게시글 삭제
  await commentRepository.deleteCommentById(commentId);

  return { message: "답글 삭제 성공" };
};


export default {
  createComment,
  getComments,
  updateComment,
  deleteComment,
}