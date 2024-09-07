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


// 댓글 등록 시 게시글의 commentCount 증가
async function incrementCommentCount(postId) {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      commentCount: { increment: 1 },
    },
  });
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
};


// commentId로 댓글 찾기
const getCommentById = async (commentId) => {
  return await prisma.comment.findUnique({
    where: { id: parseInt(commentId)},
  });
};


// 댓글 수정
const updateComment = async (commentId, commentData) => {
  const existingComment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  // 댓글이 존재하지 않는 경우
  if (!existingComment) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 업데이트할 데이터
  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    include: {
      password: false,
      postId: false,
    },
    data: {
      nickname: commentData.nickname,
      content: commentData.content,
    },
  });

  return updatedComment;
};


// commentId로 댓글 삭제
const deleteCommentById = async (commentId) => {
  await prisma.comment.delete({
    where: { id: commentId },
  });
};


// comment 삭제 시 commentCount 감소
const decrmentCommentCount = async (postId) => {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      commentCount: { decrement: 1 },
    },
  });
};


export default {
  createComment,
  incrementCommentCount,
  getComments,
  getCommentById,
  updateComment,
  deleteCommentById,
  decrmentCommentCount,
}