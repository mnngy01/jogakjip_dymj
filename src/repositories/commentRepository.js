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
};


// 댓글 목록 조회
const getComments = async ({ postId, page, pageSize }) => {  
  const comments = await prisma.comment.findMany({
    where: { postId: postId },
    orderBy: { id : "asc" },
    include: {
      postId: false,
      password: false,
    },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const totalItemCount = await prisma.comment.count({ where: { postId: postId } });

  return { comments, totalItemCount };
}

export default {
  createComment,
  getComments,
}