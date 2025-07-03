import express, { Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import multer from "multer";
import morgan from "morgan";
import prisma from "./prisma-client";
import fs from "fs";
import path from "path";

config();
const app = express();
const port = process.env.PORT || 3000;

interface StorageCallback {
  (error: Error | null, destination: string): void;
}

interface File {
  originalname: string;
}

const destinationDirectory = "src/uploads";

const storage = multer.diskStorage({
  destination: function (req: Request, file: File, cb: StorageCallback) {
    cb(null, destinationDirectory);
  },
  filename: function (req: Request, file: File, cb: StorageCallback) {
    cb(null, file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image"))
    return cb(new Error("Not an image! Please upload an image file."));
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // Set to 3 MB limit
});

// Middleware
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

/**
 * Endpoint to get all of the images
 * @route /images
 * @access public
 */
app.get("/api/images", async (req: Request, res: Response) => {
  try {
    const images = await prisma.image.findMany();
    res.status(200).json({ status: "success", data: images });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ status: "fail", message: errMessage });
  }
});

/**
 * Endpoint responsible for uploading an image file.
 * @route /upload-image
 * @access public
 */
app.post(
  "/api/upload-image",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ status: "fail", message: "No image uploaded" });
        return;
      }

      const { path, filename, destination } = req.file;
      const split = filename.split(".");
      const noExtension = split[0];
      const ext = split[1];

      const image = await prisma.image.findUnique({
        where: {
          filename: noExtension,
        },
      });

      if (image) {
        res.status(409).json({
          status: "fail",
          message: "File name already exists",
        });
        return;
      }

      await prisma.image.create({
        data: {
          path,
          filename: noExtension,
          destination,
          ext,
          url: `http://localhost:3000/uploads/${filename}`,
        },
      });

      res.status(200).json({
        status: "success",
        data: {
          path,
          filename: noExtension,
          destination,
        },
      });
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ status: "fail", message: errMessage });
    }
  }
);

/**
 * Endpoint responsible for deleting image based on the filename
 * @route /image/:id"
 * @access public
 */
app.delete("/api/image/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    console.log(req.params);

    const image = await prisma.image.findUnique({
      where: {
        id,
      },
    });

    if (!image) {
      res
        .status(404)
        .json({ status: "success", message: "File not found in database" });
      return;
    }

    const filePath = path.join(
      destinationDirectory + "/" + image.filename + `.${image.ext}`
    );

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ status: "fail", message: "File not found" });
      return;
    }

    await prisma.image.delete({
      where: {
        id,
      },
    });

    fs.unlinkSync(filePath);
    res.status(200).json({
      status: "success",
      message: `Successfully deleted ${image.filename}`,
    });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ status: "fail", message: errMessage });
  }
});

/**
 * Listens for incoming requests on the specified port.
 */
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
