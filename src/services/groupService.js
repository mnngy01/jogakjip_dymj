// groupService.js
// 비즈니스 로직
import groupRepository from "../repository/groupRepository.js";


async function create (group) {
  return await groupRepository.save(group);
}


async function getGroups({ page, pageSize, sortBy, keyword, isPublic }) {
  const skip = (page - 1) * pageSize;
}

export default {
  create,
}