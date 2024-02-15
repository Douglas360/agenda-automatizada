import multer from "multer";

interface FileObject {
  originalname: string;
  buffer: Buffer;
}

// Set the destination folder where the uploaded file will be stored
const storage = multer.diskStorage({
  destination: (req, file: FileObject, cb) => {
    cb(null, "./src/images");
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalExtension = file.originalname.substring(
      file.originalname.lastIndexOf(".")
    );
    cb(null, file.fieldname + "-" + uniqueSuffix + originalExtension);
  },
});

// Create the multer instance with the storage configuration
export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG and PNG are allowed!"));
    }
  },
});
