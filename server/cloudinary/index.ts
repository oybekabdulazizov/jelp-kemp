const cloudinary = require('cloudinary').v2;
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryOptions extends Options {
  params: {
    folder: string;
    allowedFormats: Array<string>;
  };
}

const CloudinaryStorageOpts: CloudinaryOptions = {
  cloudinary,
  params: {
    folder: 'JelpKemp',
    allowedFormats: ['jpeg', 'jpg', 'png'],
  },
};

const cloudinaryStorage = new CloudinaryStorage(CloudinaryStorageOpts);

export { cloudinary, cloudinaryStorage };
