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


export default {
  createPost,
  getGroupById,
}