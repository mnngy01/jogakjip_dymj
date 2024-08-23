// postService.js
// 비즈니스 로직
import postRepository from "../repositories/postRepository.js";


// 게시글 등록하기
async function createPost (groupId, postData) {
  const group = await postRepository.getGroupById(groupId);

  if (!group) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 그룹 비밀번호 확인
  if (group.password !== postData.groupPassword) {
    throw { status: 403, message: "그룹 비밀번호가 틀렸습니다" };
  }

  // 게시글 저장
  const newPost = await postRepository.createPost({
    ...postData,
    groupId: groupId,
    createdAt: new Date(),
  });

  return newPost;
};


export default {
  createPost,
}