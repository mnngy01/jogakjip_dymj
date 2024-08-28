// postController
// API 요청 처리
import postService from '../services/postService.js';

// 게시글 등록하기
const createPost = async (req, res) => {
  const { groupId } = req.params;
  const postData = req.body;

  try {
    const newPost = await postService.createPost(parseInt(groupId, 10), postData);
    res.status(200).json(newPost);
  } catch (error) {
    if (error.status === 403) {
      res.status(403).json({ message: error.message });
    } else if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }
};


// 게시글 목록 조회
const getPosts = async (req, res) => {
  const { groupId } = req.params;
  const { page = 1, pageSize = 10, sortBy = 'latest', keyword, isPublic } = req.query;

  try {
    const result = await postService.getPosts({
      groupId: parseInt(groupId, 10),
      page: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
      sortBy,
      keyword,
      isPublic: isPublic === 'true' // 문자열을 boolean으로 변환
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "잘못된 요청입니다" });
    // res.status(400).json({ message: error.message });
  }
};


// 게시글 수정하기
const updatePost = async (req, res) => {
  const { postId } = req.params;
  const { postPassword } = req.body;
  const postData = req.body;

  try {
    const updatedPost = await postService.updatePost(parseInt(postId, 10), postData, postPassword);
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error.status === 404 ) {
      res.status(404).json({ message: error.message });
    } else if (error.status === 403) {
      res.status(403).json({ message: error.message });
    } else {
      res.status(400).json({ message: '잘못된 요청입니다' });
      // res.status(400).json({ message: error.message });
    }
  }
};


// 게시글 삭제하기
const deletePost = async (req, res) => {
  const { postId } = req.params;
  const { postPassword } = req.body;

  // 비밀번호 미입력시
  if (!postPassword) {
    return res.status(400).json({ message: "잘못된 요청입니다" });
  }

  try {
    const result = await postService.deletePost(parseInt(postId, 10), postPassword);
    res.status(200).json(result);
  } catch (error) {
    if (error.status === 403) {
      res.status(403).json({ message: error.message });
    } else if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }
};


// 게시글 상세 정보 조회하기
const getPostDetail = async (req, res) => {
  const { postId } = req.params;

  if (isNaN(postId)) {
    return res.status(400).json({ message: "잘못된 요청입니다" });
  }

  try {
    const postDetais = await postService.getPostDetail(parseInt(postId, 10));
    res.status(200).json(postDetais);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
      // res.status(400).json({ message: error.message });
    }
  }
};


// 게시글 조회 권한 확인
const verifyPostPassword = async (req, res) => {
  const { postId } = req.params;
  const { password } = req.body;

  try {
    const result = await postService.verifyPostPassword(parseInt(postId, 10), password);
    res.status(200).json(result);
  } catch (error) {
    if (error.status === 401) {
      res.status(401).json({ message: error.message });
    } else if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청합니다" });
    }
  }
};


// 게시글 공감하기
const likePost = async (req, res) => {
  const { postId } = req.params;

  try {
    const result = await postService.likePost(parseInt(postId, 10));
    res.status(200).json(result);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }
};


// 게시글 공개 여부 확인
const checkPostVisibility = async (req, res) => {
  const { postId } = req.params;

  try {
    const postVisibility = await postService.checkPostVisibility(parseInt(postId, 10));
    res.status(200).json(postVisibility);
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(400).json({ message: "잘못된 요청입니다" });
    }
  }
};


export default {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPostDetail,
  verifyPostPassword,
  likePost,
  checkPostVisibility,
}