import prisma from "../config/prisma.js";


// 그룹에 뱃지 추가
const addBadgeToGroup = async (groupId, badgeType) => {
  return await prisma.badge.create({
    data: {
      type: badgeType,
      groupId: groupId,
    },
  });
};


// 그룹이 뱃지를 가지고 있는지
const groupHasBadge = async (groupId, badgeType) => {
  return await prisma.badge.findFirst({
    where: {
      groupId: groupId,
      type: badgeType,
    },
  });
};

export default {
  addBadgeToGroup,
  groupHasBadge,
}