// imageController.js
import multer from 'multer';
import express from 'express';


// multer를 사용해 파일을 저장할 경로와 파일명 지정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/attachments'); // 파일 저장 경로
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // 파일명 지정
  }
});

const upload = multer({ storage: storage });
const router = express.Router();

// 이미지 업로드 및 URL 생성
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
    return res.status(400).json({ message: "이미지 파일이 필요합니다" });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/attachments/${req.file.filename}`;

  res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
});


export default router;