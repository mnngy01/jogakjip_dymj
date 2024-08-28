// postRepository.js
// 데이터베이스와 상호작용
import prisma from "../config/prisma.js";


// 게시글 저장
async function createPost(groupId, postData) {
  return await prisma.post.create({
    data: {
      groupId: groupId,
      nickname: postData.nickname,
      title: postData.title,
      content: postData.content,
      imageUrl: postData.imageUrl,
      location: postData.location,
      moment: postData.moment,
      isPublic: Boolean(postData.isPublic),
      password: postData.postPassword,
      tags: new Array(...postData.tags),
      createdAt: new Date(),
    },
  });
};


// 그룹id로 그룹 찾기
async function getGroupById(groupId) {
  return await prisma.group.findUnique({
    where: { id: groupId },
  });
};


// 게시글 목록 조회
async function getPosts({ groupId, page, pageSize, sortBy, keyword, isPublic }) {
  let whereClause = {};

  // keyword
  if (keyword) {
    whereClause.title = {
      contains: keyword,
      mode: 'insensitive'
    };
  };

  // isPublic
  if (isPublic !== undefined) {
    whereClause.isPublic = isPublic;
  }

  // groupId
  whereClause.groupId = groupId;

  const orderByClause = {};
  switch (sortBy) {
    case 'mostCommented':
      orderByClause.commentCount = 'desc';
      break;
    case 'mostLiked':
      orderByClause.likeCount = 'desc';
      break;
    case 'latest':
      default:
        orderByClause.createdAt = 'asc';
        break;
  }

  const posts = await prisma.post.findMany({
    where: whereClause,
    orderBy: orderByClause,
    include: {
      groupId: false,
      password: false,
      content: false,
    },
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  const totalItemCount = await prisma.post.count({ where: whereClause });

  return { posts, totalItemCount };
};


// 게시글 수정 
async function updatePost(postId, updateData) {
  const existingPost = await prisma.post.findUnique({
    where: { id: postId }
  });

  // 존재하는 게시글이 없다면 에러코드
  if (!existingPost) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 업데이트할 데이터
  const updatedPost = await prisma.post.update({
    where: { id: postId },
    include: {
      password: false,
    },
    data: {
      nickname: updateData.nickname,
      title: updateData.title,
      content: updateData.content,
      imageUrl: updateData.imageUrl,
      tags: new Array(...updateData.tags),
      location: updateData.location,
      moment: updateData.moment,
      isPublic: Boolean(updateData.isPublic),
    }
  });

  return updatedPost; // 업데이트된 데이터 반환
};


// postId로 게시글 찾기
async function getPostById(postId) {
  return await prisma.post.findUnique({
    where: { id: parseInt(postId) },
  });
};


// postId로 게시글 삭제
async function deletePostById(postId) {
  await prisma.post.delete({
    where: { id: postId },
  });
};


// 그룹 공감하기 : likeCount 증가
async function incrementPostLikeCount(postId) {
  return await prisma.post.update({
    where: { id: postId },
    data: {
      likeCount: { increment: 1, }
    },
  });
};


// 그룹 공개 여부 확인
async function getPostVisibilityById(postId) {
  return await prisma.post.findUnique({
    where: { id: postId },
    select: {
      id: true,
      isPublic: true,
    },
  });
};


export default {
  createPost,
  getGroupById,
  getPosts,
  updatePost,
  getPostById,
  deletePostById,
  incrementPostLikeCount,
  getPostVisibilityById,
}