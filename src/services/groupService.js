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

export default {
  create,
  getGroups,
}