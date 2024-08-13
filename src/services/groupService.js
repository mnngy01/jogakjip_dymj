import groupRepository from "../repository/groupRepository.js";


async function create (group) {
  return await groupRepository.save(group);
}


export default {
  create,
}