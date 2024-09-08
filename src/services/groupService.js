// groupService.js
// 비즈니스 로직
import groupRepository from "../repositories/groupRepository.js";
import badgeRepository
 from "../repositories/badgeRepository.js";

// 그룹 등록하기
async function create (group) {
  return await groupRepository.save(group);
}


// 그룹 목록 조회하기
async function getGroups({ page, pageSize, sortBy, keyword, isPublic }) {
  const filters = {
    page,
    pageSize,
    sortBy,
    keyword,
    isPublic: isPublic === undefined ? undefined : isPublic === true
  };

  const { groups, totalItemCount } = await groupRepository.getGroups(filters);
  const totalPages = Math.ceil(totalItemCount / pageSize);

  return {
    currentPage: page,
    totalPages,
    totalItemCount,
    groups
  };

};


// 그룹 수정하기
async function update(groupId, updateData) {
  
 const group = await groupRepository.getGroupById(groupId);

  // 그룹이 존재하지 않다면
  if (!group) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 비밀번호가 틀렸다면
  if (group.password !== updateData.password) {
    throw { status: 403, message: "비밀번호가 틀렸습니다" };
  }

  // 비밀번호를 제외한 나머지 필드 업데이트
  const { password, ...dataToUpdate } = updateData;
  const updatedGroup = await groupRepository.update(groupId, dataToUpdate);

  return {
    id: updatedGroup.id,
    name: updatedGroup.name,
    imageUrl: updatedGroup.imageUrl,
    isPublic: updatedGroup.isPublic,
    likeCount: updatedGroup.likeCount,
    badges: updatedGroup.badges.map(badge => badge.name),
    postCount: updatedGroup.postCount,
    createdAt: updatedGroup.createdAt,
    introduction: updatedGroup.introduction
  };

};


// 그룹 삭제하기
async function deleteGroup(groupId, password) {
  const group = await groupRepository.getGroupById(groupId);

  // 그룹이 존재하지 않는다면
  if (!group) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 비밀번호 검증
  if (group.password !== password) {
    throw { status: 403, message: "비밀번호가 틀렸습니다" };
  }

  // 그룹 삭제
  await groupRepository.deleteGroupById(groupId);

  return { message: "그룹 삭제 성공" };
}


// 그룹 상세 정보 조회하기
async function getGroupDetails(groupId) {
  const nowGroup = await groupRepository.getGroupById(groupId);

  if (!nowGroup) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  /*
   *  그룹 생성 후 1년 달성 시 badge3 부여 
   */
  const nowDate = new Date();   // 현재 시간
  let dateGap = nowDate.getTime() - nowGroup.createdAt.getTime();  // 그룹 생성 시간 차이
  dateGap = Math.abs(dateGap / (1000 * 60 * 60 * 24));  // 차이 일수
  console.log(dateGap);
  
  if (dateGap >= 365) {
    const hasBadge3 = await badgeRepository.groupHasBadge(groupId, 'badge3');

    if (!hasBadge3) {
      await badgeRepository.addBadgeToGroup(groupId, 'badge3');
      await groupRepository.incrementBadgeCount(groupId);
    }
  }

  const group = await groupRepository.getGroupById(groupId);


  return {
    id: group.id,
    name: group.name,
    imageUrl: group.imageUrl,
    isPublic: group.isPublic,
    likeCount: group.likeCount,
    badges: group.badges.map(badge => badge.type),
    postCount: group.postCount,
    createdAt: group.createdAt,
    introduction: group.introduction,
  };

};


// 그룹 조회 권한 확인하기
async function verifyGroupPassword(groupId, password) {
  const group = await groupRepository.getGroupById(groupId);

  // 그룹이 없다면
  if (!group) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 비밀번호 검증
  if (group.password !== password) {
    throw { status: 401, message: "비밀번호가 틀렸습니다" };
  }

  return { message: "비밀번호가 확인되었습니다" };
};


// 그룹 공감하기
async function likeGroup(groupId) {
  const group = await groupRepository.getGroupById(groupId);

  // 그룹이 없다면
  if (!group) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  const newGroup = await groupRepository.incrementGroupLikeCount(groupId);

  /*
   *  그룹 공감 1만 개 달성 시 badge4 부여 
   */
  if (newGroup.likeCount >= 10000) {
    const hasBadge4 = await badgeRepository.groupHasBadge(groupId, 'badge4');

    if (!hasBadge4) {
      await badgeRepository.addBadgeToGroup(groupId, 'badge4');
      await groupRepository.incrementBadgeCount(groupId);
    }
  }
  

  return { message: "그룹 공감하기 성공" };
};


// 그릅 공개 여부 확인
async function checkGroupVisibility(groupId) {
  const group = await groupRepository.getGroupVisibilityById(groupId);

  // 그룹이 없으면
  if (!group) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  return {
    id: group.id,
    isPublic: group.isPublic,
  };
  
};

export default {
  create,
  getGroups,
  update,
  deleteGroup,
  getGroupDetails,
  verifyGroupPassword,
  likeGroup,
  checkGroupVisibility,
}