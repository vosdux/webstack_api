import multer from 'multer';
import ApiError from '../exceptions/index';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images');
  },

  filename(req, file, cb) {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  }
});

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(ApiError.BadRequest('Неверный формат файла'), false);
  }
}

export default multer({ storage, fileFilter });
