// GroupRepository.js
// 데이터베이스와 상호작용
import prisma from "../config/prisma.js";

// 그룹 저장
async function save(group) {
  return await prisma.group.create({
    data: {
      name: group.name,
      password: group.password,
      imageUrl: group.imageUrl,
      isPublic: Boolean(group.isPublic),
      likeCount: 0,
      postCount: 0,
      createdAt: new Date(),
      introduction: group.introduction,
    },
  });
}


// 그룹 목록 조회하기



export default {
  save,
}