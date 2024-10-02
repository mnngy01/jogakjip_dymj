import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const imageUpload = async (req, res) => {
  const filename = req.file.filename;
  const path = `/profile${filename}`;
  res.json({ path });
};

export default {
  upload,
  imageUpload,
}