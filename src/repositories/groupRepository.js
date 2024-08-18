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
async function getGroups(filters) {
  const { skip, take, sortBy, keyword, isPublic } = filters;

  // keyword
  let whereClause = {};
  if (keyword) {
    whereClause.name = {
      contains: keyword,
      mode: 'insensitive'
    };
  }

  // isPublic
  if (isPublic !== undefined) {
    whereClause.isPublic = isPublic;
  }

  // sortBy
  let orderByClause = () => {
    switch (sortBy) {
      case "mostPosted":
        return { postCount : 'desc' };
        break;
      case "mostLiked":
        return { likeCount : 'desc' };
        break;
      case "mostBadge":
        return { badgeCount : 'desc' };
        break;
      case "latest":
      default:
        return { createdAt : 'desc' };
        break;
    }
  }

  const totalItemCount = await prisma.group.count({ where: whereClause });
  const groups = await prisma.group.fineMany({
    where: whereClause,
    orderBy: orderByClause,
    skip: skip,
    take: take
  });

  return { groups, totalItemCount };
}


// id로 그룹 찾기
async function getById(groupId) {
  return await prisma.group.findUnique({
    where: {
      id: parseInt(groupId)
    },
  });
}


// 그룹 수정하기(update)
async function update(groupId, updateData) {
  return await prisma.group.update({
    where: {id: groupId },
    data: updateData,
  });
}


export default {
  save,
  getGroups,
  getById,
  update,
}