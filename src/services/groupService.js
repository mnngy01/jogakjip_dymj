// groupService.js
// 비즈니스 로직
import groupRepository from "../repository/groupRepository.js";

// 그룹 등록하기
async function create (group) {
  return await groupRepository.save(group);
}

// 그룹 목록 조회하기
async function getGroups({ page, pageSize, sortBy, keyword, isPublic }) {
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const filters = {
    skip,
    take,
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
  
 const group = await groupRepository.getById(groupId);

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
  const group = await groupRepository.getById(groupId);

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

export default {
  create,
  getGroups,
  update,
  deleteGroup,
}