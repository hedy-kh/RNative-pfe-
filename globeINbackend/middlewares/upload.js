const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|mp4|mov|avi/; // Add video file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and videos only! (JPEG, JPG, PNG, MP4, MOV, AVI)');
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 50 }, // 50 MB limit
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]);

module.exports = { upload };
