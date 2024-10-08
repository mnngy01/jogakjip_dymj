import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const imageUpload = async (req, res) => {
  try{
    const filename = req.file.filename;
    const path = `/uploads/${filename}`;
    res.status(200).json({ imageUrl: path });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  upload,
  imageUpload,
}