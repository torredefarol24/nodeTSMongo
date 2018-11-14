import * as Multer from 'multer'

let fileUploadOptions = {
  dest : "storage"
};

const fileUpload = Multer(fileUploadOptions);

export default fileUpload;
