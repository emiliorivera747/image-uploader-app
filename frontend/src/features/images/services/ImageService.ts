import type { UploadImageResponse } from "../types/imageService";

/**
 * Sends image file to backend
 *
 * @param formData
 * @returns upload-image response
 */
const uploadImage = async (
  formData: FormData
): Promise<UploadImageResponse> => {
  const res = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to uppload image");

  return res.json();
};

/**
 * Deletes the image using image id
 *
 * @param id
 * @returns delete image response
 */
const deleteImage = async (id: string) => {
  const res = await fetch(`/api/image/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete image");

  return res.json();
};

/**
 * Get all images
 *
 * @returns Get image response
 */
const getAllImages = async () => {
  const res = await fetch("/api/images", {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to retrive image");

  return res.json();
};

const ImageService = {
  uploadImage,
  deleteImage,
  getAllImages,
};

export default ImageService;
