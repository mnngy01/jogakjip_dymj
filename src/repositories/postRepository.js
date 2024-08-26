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
      moment: new Date(postData.moment),
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


// 그룹 목록 조회
async function getPosts({ groupId, page, pageSize, sortBy, keyword, isPublic }) {
  const whereClause = {
    isPublic: isPublic !== undefined ? isPublic : undefined,
    OR: keyword ? [
      { title: { contains: keyword } },
      { content: { contains: keyword } },
    ] : undefined,
  };

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
        orderByClause.createdAt = 'desc';
        break;
  }

  const posts = await prisma.post.findMany({
    where: whereClause,
    orderBy: orderByClause,
    skip: (pate - 1) * pageSize,
    take: pageSize
  });

  const totalItemCount = await prisma.post.count({ where: whereClause });

  return { posts, totalItemCount };
};


// 게시글 수정 
async function updatePost(postId, updateDate) {
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
    data: updateDate
  });

  return updatedPost; // 업데이트된 데이터 반환
}

export default {
  createPost,
  getGroupById,
  getPosts,
  updatePost,
}