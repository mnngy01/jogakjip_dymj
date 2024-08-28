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

  const newPost = await postRepository.createPost(groupId, postData);

  // moment 날짜 출력 형식 포맷팅 yyyy-mm-dd
  /**
  const y = newPost.moment.getFullYear();
  const m = ('0' + (newPost.moment.getDate() + 1)).slice(-2);
  const d = ('0' + newPost.moment.getDate()).slice(-2);
  const moment = `${y}-${m}-${d}`;
  */

  return {
    id: newPost.id,
    groupId: newPost.groupId,
    nickname: newPost.nickname,
    title: newPost.title,
    content: newPost.content,
    imageUrl: newPost.imageUrl,
    tags: newPost.tags,           // tags가 한 줄로 안 나오는 현상 있음
    location: newPost.location,
    moment: newPost.moment,
    ispublic: newPost.isPublic,
    likeCount: newPost.likeCount,
    commentCount: newPost.commentCount,
    createdAt: newPost.createdAt,
  }
};


// 게시글 목록 조회
async function getPosts({ groupId, page, pageSize, sortBy, keyword, isPublic }) {
  const { posts, totalItemCount } = await postRepository.getPosts({
    groupId,
    page,
    pageSize,
    sortBy,
    keyword,
    isPublic,
  });

  const totalPages = Math.ceil(totalItemCount / pageSize);

  return {
    currentPage: page,
    totalPages,
    totalItemCount,
    data: posts
  };
};


// 게시글 수정하기
const updatePost = async (postId, postData, postPassword) => {
  const existingPost = await postRepository.getPostById(postId);

  // 게시글이 없다면
  if (!existingPost) {
    throw { status: 404, message: '존재하지 않습니다' };
  }

  // 비밀번호가 틀리다면
  if (existingPost.password !== postPassword) {
    throw { status: 403, message: '비밀번호가 틀렸습니다' };
  }

  return await postRepository.updatePost(postId, postData);
}


// 게시글 삭제하기
const deletePost = async (postId, postPassword) => {
  const post = await postRepository.getPostById(postId);

  // 게시글이 존재하지 않는 경우
  if (!post) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 비밀번호 검증
  if (post.password !== postPassword) {
    throw { status: 403, message: "비밀번호가 틀렸습니다" };
  }

  // 게시글 삭제
  await postRepository.deletePostById(postId);

  return { message: "게시글 삭제 성공" };
};


// 게시글 상세 정보 조회
async function getPostDetail(postId) {
  const post = await postRepository.getPostById(postId);

  if (!post) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  return {
    id: post.id,
    groupId: post.groupId,
    nickname: post.nickname,
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl,
    tags: post.tags,
    location: post.location,
    moment: post.moment,
    isPublic: post.isPublic,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    createdAt: post.createdAt,
  }
};


// 게시글 조회 권한 확인
async function verifyPostPassword(postId, password) {
  const post = await postRepository.getPostById(postId);

  // 게시글이 없으면
  if (!post) {
    throw { status: 404, message: "존재하지 않습니다" };
  }

  // 비밀번호 검증
  if (post.password !== password) {
    throw { status: 401, message: "비밀번호가 틀렸습니다" };
  }

  return { message: "비밀번호가 확인되었습니다" };
};


export default {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostDetail,
  verifyPostPassword,
}