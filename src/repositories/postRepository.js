// postRepository.js
// 데이터베이스와 상호작용
import prisma from "../config/prisma.js";


// 게시글 저장
async function createPost(postData) {
  return await prisma.post.create({
    data: postData,
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
}

export default {
  createPost,
  getGroupById,
  getPosts,
}