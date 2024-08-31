// commentRepository.js
// 데이터베이스와 상호작용
import prisma from "../config/prisma.js";


// 댓글 생성
const createComment = async (postId, commentData) => {
  const newComment = await prisma.comment.create({
    data: {
      nickname: commentData.nickname,
      content: commentData.content,
      password: commentData.password,
      postId: postId,
    }
  });

  return newComment;
}

export default {
  createComment,
}